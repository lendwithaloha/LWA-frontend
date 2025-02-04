

"use client";
import React from "react";


const Footer = () => {
    return (
        <div className="bg-homePrimary px-20">
            <div className="flex py-4 text-homeWhite justify-around md:justify-between items-center gap-10 ">
                <p className="text-[12px] opacity-50">© 2024 Lend With Aloha, All Rights Reserved</p>
                <div className="flex justify-between md:justify-between items-center gap-6 text-[10px] md:gap-10 md:text-sm  "><p>Privacy Policy</p><p >Terms and Conditions</p></div>
            </div>
        </div>
    );
};

export default Footer;
