import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import LogoImage from "@/public/images/loha.png";
import Image from "next/image";

const Logo = () => {
    return (
        <div className="h-20 mx-2 flex items-center ">
            {/* Left Section: Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" component="div">
                    <Link
                        href="/"
                        style={{
                            textDecoration: "none",
                            color: "#000",
                            fontWeight: "bold",
                        }}
                    >
                        <Image src={LogoImage} alt="lend with loha" className="w-12                 " />
                    </Link>
                </Typography>
            </Box>


            <div className="ml-2 overflow-hidden">
                <h1 className="text-xl font-medium animate-fade-slide-in">
                    Lend with <span className="block text-primaryColor font-bold">Aloha</span>
                </h1>
            </div>

        </div>
    )
}

export default Logo