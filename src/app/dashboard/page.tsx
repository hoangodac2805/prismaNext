"use client";
import React from "react";
import { Button } from "antd";
import { useAuth } from "@/contexts/AuthContext";
const Home = () => {
  const {logout,loginedUser} = useAuth()
  return <main>
    <Button type="primary" onClick={()=>{
      logout()
    }}>Log out</Button>
    {loginedUser?.email}
  </main>;
};

export default Home;
