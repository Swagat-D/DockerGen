import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import ConnectDb from "../../../../middleware/connectDb";
import CryptoJS from "crypto-js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const BASE_URL = process.env.NEXT_URL || "http://localhost:3001";
const ERROR_REDIRECT = new URL("/githuberr", BASE_URL).toString();
const HOME_REDIRECT = new URL("/", BASE_URL).toString();

export const GET = async (req: NextRequest) => {
    const cookieStore = cookies();
    
    try {
        await ConnectDb();
        
        // Extract and validate query parameters
        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        
        if (!code || !state || state !== process.env.NEXT_PUBLIC_STATE) {
            console.log('Invalid GitHub OAuth parameters');
            return NextResponse.redirect(ERROR_REDIRECT);
        }
        
        // Get GitHub access token
        const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.NEXT_PUBLIC_GIT_HUB_CLIENT_ID,
                client_secret: process.env.GIT_HUB_CLIENT_SECRET,
                code,
                redirect_uri: process.env.NEXT_PUBLIC_GIT_HUB_REDIRECT_URI,
                state: process.env.NEXT_PUBLIC_STATE
            })
        });
        
        const tokenData = await tokenResponse.json();
        if (tokenData.error) {
            console.log('GitHub OAuth Error:', tokenData.error_description);
            return NextResponse.redirect(ERROR_REDIRECT);
        }
        
        // Get GitHub user details
        const userResponse = await fetch("https://api.github.com/user", {
            headers: {
                "Authorization": `Bearer ${tokenData.access_token}`
            }
        });
        const githubUser = await userResponse.json();
        
        // Encrypt GitHub token
        const encryptedToken = CryptoJS.AES.encrypt(
            tokenData.access_token,
            process.env.SECRET_KEY || ""
        ).toString();
        
        // Generate JWT token
        const authToken = jwt.sign(
            {
                name: githubUser.name,
                email: githubUser.email,
                githubid: githubUser.login
            },
            process.env.SECRET_KEY || ""
        );
        
        // Set authentication cookie
        cookieStore.set({
            name: 'ltoken',
            value: authToken,
            httpOnly: true,
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        
        // Update or create user
        const userData = {
            name: githubUser.name,
            email: githubUser.email || "",
            githubid: githubUser.login,
            githubtoken: encryptedToken,
            img: githubUser.avatar_url,
        };
        
        await User.findOneAndUpdate(
            { email: githubUser.email },
            userData,
            { upsert: true, new: true }
        );
        
        return NextResponse.redirect(HOME_REDIRECT);
    } catch (error) {
        console.error('GitHub OAuth Error:', error);
        
        return NextResponse.redirect(ERROR_REDIRECT);
    }
};