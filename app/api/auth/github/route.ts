import { NextRequest,NextResponse } from "next/server";
import User from "../../../../models/User"
import ConnectDb from "../../../../middleware/connectDb"
import CryptoJS from "crypto-js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export const GET = async (req: NextRequest,res:NextResponse) => {
    const setcookie = cookies();
    try{
        await ConnectDb();
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if(code==null && state==null){
        return NextResponse.redirect(`${process.env.NEXT_URL||""}/githuberr`);
    }
    if(state!=process.env.NEXT_PUBLIC_STATE){
        return NextResponse.redirect(`${process.env.NEXT_URL||""}/githuberr`);
    }
    let maketoken = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"  // Ensures you get the response in JSON format
        },
        body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_GIT_HUB_CLIENT_ID,   
            client_secret: process.env.GIT_HUB_CLIENT_SECRET, 
            code: code,  
            redirect_uri: process.env.NEXT_PUBLIC_GIT_HUB_REDIRECT_URI, 
            state: process.env.NEXT_PUBLIC_STATE  
        })
    })
    const data = await maketoken.json();
    console.log(data);
    //if error occurs
    if(data.error){
        return NextResponse.redirect(`${process.env.NEXT_URL||""}/githuberr`);
    }
 //save the date return to authenticating page
  //see the github user details
    let getuser = await fetch("https://api.github.com/user",{
        headers:{
            "Authorization":`Bearer ${data.access_token}`
        }
    });
    const githubuser = await getuser.json();
    console.log(githubuser);
//encrypting the github token for security reasons
let token = CryptoJS.AES.encrypt(data.access_token,process.env.SECRET_KEY||"").toString();
console.log(githubuser)
let finduser = await User.findOne({email:githubuser.email});
if(finduser!=null){
    let updateuser = await User.findOneAndUpdate({email:githubuser.email},{githubtoken:token,img:githubuser.avatar_url,githubid:githubuser.login,name:githubuser.name});
    let authtoken = jwt.sign({name:githubuser.name,email:githubuser.email,githubid:githubuser.login},process.env.SECRET_KEY||"")
console.log(authtoken)
setcookie.set({
    name: 'ltoken',
    value: authtoken,
    httpOnly: true,
    path: '/',
    expires:new Date(Date.now() + 1000*60*60*24*7)
  })
return NextResponse.redirect(`${process.env.NEXT_URL||""}/`);
}
let user = new User({
    name:githubuser.name,
    email:githubuser.email||"",
    githubid:githubuser.login,
    githubtoken:token,
    img:githubuser. avatar_url,
})
let save = await user.save();
let authtoken = jwt.sign({name:githubuser.name,email:githubuser.email,githubid:githubuser.login},process.env.SECRET_KEY||"")
console.log(authtoken)
setcookie.set({
    name: 'ltoken',
    value: authtoken,
    httpOnly: true,
    path: '/',
  })
return NextResponse.redirect(`${process.env.NEXT_URL||""}/`);
    }
    catch(err){
        console.log(err);
        return NextResponse.redirect(`${process.env.NEXT_URL||""}/githuberr`);
    }
}