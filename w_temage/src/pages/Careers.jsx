import React from "react";
import { SignedIn, SignedOut, SignInButton, useUser, useAuth } from "@clerk/clerk-react";
import Show_Login from "@/componet/careers/Show_Login";
import Applicant from "@/componet/careers/Applicant";

const Careers = () => {
  const { user, } = useUser();
  const { getToken } = useAuth();

  console.log(user);
  console.log(getToken);

  return (
    <>
      <SignedIn>
        
        <img src="/fina-logo-color.png" alt="Job Icon 1" className="w-28 h-auto" />
        <Applicant/>
      </SignedIn>

      <SignedOut>
        {/* ถ้ายังไม่ได้ล็อกอิน */}
        <Show_Login />
      </SignedOut>
    </>
  );
};

export default Careers;
