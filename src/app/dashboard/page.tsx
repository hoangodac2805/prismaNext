"use client";
import React from "react";
import { Button } from "antd";
import { useAuth } from "@/contexts/AuthContext";
const Home = () => {
  const {logout} = useAuth()
  return <main>
    <Button type="primary" onClick={()=>{
      logout()
    }}>Log out</Button>
  </main>;
};

export default Home;
