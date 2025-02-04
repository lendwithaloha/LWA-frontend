"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import Link from "next/link";

const teamMembers = [
  {
    name: "Brian Fung",
    title: "President of Lend with Aloha",
    description:
      "Brian&apos;s professional career began in 2015 where he managed over 150+ residential loans across the West Coast. In 2017, he decided to create a space within the loan industry that was more inclusive and welcoming to all. He founded Lend with Aloha in 2018, and has since been spreading the spirit of ALOHA one deal at a time.",
    image: "/team/brian.png",
  },
  {
    name: "Miguel Vazquez",
    title: "Senior Account Executive",
    description:
      'Miguel was born and raised in Los Angeles to parents who emigrated from Mexico. Miguel has vast experience in financial services, thriving in customer relations that was more inclusive and welcoming to all. He founded Lend with Aloha in 2018, and has since been spreading the spirit of ALOHA one deal at a time.",',
    image: "/team/miguel.png",
  },
  {
    name: "Karen Serrac",
    title: "Loan Processor",
    description:
      'Karen is a seasoned professional with 5+ years of experience in processing. Her skills bring unparalleled efficiency and detail to every project that was more inclusive and welcoming to all. He founded Lend with Aloha in 2018, and has since been spreading the spirit of ALOHA one deal at a time.",',
    image: "/team/karen.png",
  },
];

const About = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleReadMoreClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle the expansion
  };

  return (
    <div className="min-h-screen flex flex-col  bg-gray-50">
      <Navbar />
      <Container maxWidth="lg" className="py-16">
        <Box className="text-center mb-10">
          <Typography variant="h3" className="font-bold text-gray-900 mb-6">
            Meet the Ohana
          </Typography>
          <Typography variant="body1" className="mb-12 text-gray-600">
            Spreading the spirit of ALOHA one deal at a time.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center" className="mb-16">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box className="text-center">
                <Avatar
                  alt={member.name}
                  src={member.image}
                  sx={{ width: 150, height: 150, margin: "0 auto 16px" }}
                />
                <Typography
                  variant="h6"
                  className="text-gray-800 font-semibold"
                >
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" className="text-gray-500 mb-4">
                  {member.title}
                </Typography>

                <Typography variant="body2" className="text-gray-600">
                  {expandedIndex === index
                    ? member.description
                    : // Truncate the description if not expanded
                      `${member.description.substring(0, 150)}...`}
                </Typography>

                <Button
                  className="mt-4"
                  variant="outlined"
                  onClick={() => handleReadMoreClick(index)}
                >
                  {expandedIndex === index ? "Close" : "Read More"}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Social Media Section */}
        <Box className="text-center mb-8">
          <Typography variant="h5" className="font-bold text-gray-800 mb-4">
            Connect with Us
          </Typography>
          <Box className="flex justify-center space-x-4">
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                fontSize="large"
                className="text-gray-600 hover:text-blue-500"
              />
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook
                fontSize="large"
                className="text-gray-600 hover:text-blue-500"
              />
            </Link>
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn
                fontSize="large"
                className="text-gray-600 hover:text-blue-500"
              />
            </Link>
          </Box>
        </Box>

        {/* Footer Section */}
        <Box className="text-center border-t pt-8">
          <Typography variant="caption" className="text-gray-500">
            &copy; 2024 Lend with Aloha. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default About;
