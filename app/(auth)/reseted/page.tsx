import BlackButton from "@/components/BlackButton";
import { Container, Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Container
        maxWidth="sm"
        className="bg-[#EEF0F2] flex flex-col items-center gap-7 p-5 px-16 py-16"
      >
        <Image src="/images/done.png" alt="Mail" width={70} height={70} />
        <Divider flexItem />
        <p className="w-[400px] text-gray-500 text-center">
          Your password has been reset. You can now log in with your new
          password.
        </p>
        <Link href="/login" className="w-full">
          <BlackButton text="Go To Login" />
        </Link>
      </Container>
    </div>
  );
};

export default page;
