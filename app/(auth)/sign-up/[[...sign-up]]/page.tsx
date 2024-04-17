import React from 'react';
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <SignUp />
    </main>
  );
};

export default SignUpPage;