import React from "react";
import ReusableButton from "../common_btn";

const GetStarted = () => {
  return (
    <div className="max-w-[1100px] w-full mx-auto px-4">
      <h1 className="text-5xl font-bold mb-8">Get Started</h1>
      <p className="my-4">
        Grow your real estate business with Lend with Aloha.
      </p>
      <p className="mb-4">
        Get started today by submitting an inquiry through your Borrower Portal.
      </p>
      {/* <button className="bg-primaryColor text-white rounded-lg px-6 py-3">
        Sign Up
      </button> */}
      <ReusableButton label="Sign Up"></ReusableButton>
    </div>
  );
};

export default GetStarted;
