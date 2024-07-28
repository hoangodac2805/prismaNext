'use client'
import React from "react";
import useLoadingScreen from "@/hooks/useLoadingScreen";
import Loading from "@/components/Loading";

const LoadingScreen = () => {
  const { isLoading } = useLoadingScreen();
  if (!isLoading) return null;
  return <Loading />;
};

export default LoadingScreen;
