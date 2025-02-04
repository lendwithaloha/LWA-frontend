import React from "react";
import Navbar from "../Navbar";
import Hero from "./Hero";
import StepComponent from "./StepComponent";
import Services from "./Services";
import ApplyLoan from "./ApplyLoan";
import InformationSection from "./InformationSection";

const Home = () => {
  return (
    <div className="">
      <Navbar />

      <div>
        <Hero />
        {/* <TailoredLanding /> */}

      </div>
      <StepComponent />

      {/* <InformationSection /> */}

      <Services />

      <ApplyLoan />
      <div className="my-10 w-full border border-homeBorder" />

      <InformationSection />



    </div>
  );
};

export default Home;
