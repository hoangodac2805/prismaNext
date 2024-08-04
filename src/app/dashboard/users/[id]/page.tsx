"use client";
import Edit_UserForm from "@/components/BodyForm/Edit_UserForm";
import Loading from "@/components/Loading";
import { useQueryUserParam } from "@/hooks/Query/users";
import React from "react";

const Home = ({ params }: { params: { id: number } }) => {
  const { data, isLoading, isError } = useQueryUserParam(params.id);
  if (isLoading) return <Loading />;
  if (isError || !data) return <>not found</>;

  return (
    <div>
      <Edit_UserForm user={data?.data.user} />
    </div>
  );
};

export default Home;
