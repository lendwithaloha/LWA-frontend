"use client";

import BlackButton from "@/components/BlackButton";
import {
  Box,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AccountCreatedPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: "#EEF0F2",
          justifyContent: "space-between",
          p: { xs: 4, md: 10 },
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "100%", md: "50%" },
            justifyContent: "center",
            gap: { xs: 4, md: 8 },
            mb: { xs: 4, md: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Image
              src="/images/loha.png"
              alt="Mail"
              width={60}
              height={60}
              className="self-center"
            />
            <Typography className="text-primaryColor" variant="h6">Lend with Aloha</Typography>
          </Box>

          <Image
            src="/images/registration-illustration.png"
            alt="Mail"
            width={isMobile ? 150 : 300}
            height={isMobile ? 150 : 300}
          />
        </Box>

        {!isMobile && <Divider orientation="vertical" flexItem />}

        <Box

          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: { xs: "100%", md: "45%" },
          }}
        >
          <Image
            src="/images/done.png"
            alt="done"
            width={80}
            height={80}
            className="mb-10 self-center "
          />
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 2 }}
            className="text-primaryColor"
          >
            Account Created Successfully
          </Typography>
          <Typography align="center" sx={{ mb: 4, maxWidth: "100%" }}>
            Your account has been successfully created. You can now log in and
            start exploring.
          </Typography>
          <Link href="/login">
            <BlackButton text="Go to Login" />
          </Link>
        </Box>
      </Container>
    </div>
  );
};

export default AccountCreatedPage;
