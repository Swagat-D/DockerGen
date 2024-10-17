"use client"
import React, { useEffect, useState } from 'react'
import DockerFilegen from '@/utils/DockerFilegen'
const page = () => {
  const [alluserdata,setalluserdata] = useState([]);
  const[token,setToken]=useState("");
  const[repo,setAllRepo]=useState([])
  const [islogin,setislogin] =useState(false)
  const[loading,setLoading] = useState(false)
  const fetchuserdata = async()=>{
    setLoading(true);
   const data = await fetch("/api/verifyuser");
   const result = await data.json();
   setLoading(false)
   console.log("result is ",result)
   if(result.success){
    setalluserdata(result.data)
    setAllRepo(result.repo)
    setToken(result.token)
    setislogin(true);
   }
  }
  console.log(alluserdata,repo,token)
  useEffect(()=>{
fetchuserdata();
  },[])
  return (
    <div>
      <DockerFilegen userdata={alluserdata} repo={repo} token={token} islogin={islogin} loading={loading}/>
    </div>
  )
}

export default page
