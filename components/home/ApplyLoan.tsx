

"use client";
import React from "react";


const ApplyLoan = () => {
    return (
        <div className="bg-homePrimary mx-[10%] my-20 py-14 rounded-2xl">
            <div className="flex flex-col text-homeWhite justify-center items-center gap-4 px-10">
                <h1 className="font-bold  md:text-2xl">Ready to Start Your Next Project?</h1>
                <p className="font-normal text-sm md:text-base" >Get started with our Fix and Flip loans today. Fast approval, flexible terms, and no hidden fees.</p>
                <button className="bg-homeWhite px-16 py-2 text-homePrimary rounded-full">Apply</button>
            </div>
        </div>
    );
};

export default ApplyLoan;
