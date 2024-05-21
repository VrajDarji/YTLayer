import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return <SignUp redirectUrl={"/"} />;
};

export default page;
