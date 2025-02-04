"use client";

import React from "react";
import { TextField, Button, Box, Typography, Grid, Paper, Container } from "@mui/material";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ContactForm = () => {

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "primary.main" }} gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We’d love to hear from you! Whether you have a question or just want to say hello, drop us a message.
          </Typography>
        </Box>

        {/* Contact Form */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: "white", mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              component="form"
              action="https://formspree.io/f/mnnqlelk"
              method="POST"
              sx={{ mt: 2 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Father&apos;s Name"
                    name="fatherName"
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Your Email"
                    type="email"
                    name="email"
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Your Message"
                    name="message"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, py: 1.5 }}
              >
                Send Message
              </Button>
            </Box>
          </motion.div>
        </Paper>

        <Grid container spacing={4}>
          {/* Contact and Social Media Box */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center", p: 4, borderRadius: 3, boxShadow: 3, height: '100%' }}>
              {/* Contact Information */}
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
                Our Office
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                123 Aloha Lane, Honolulu, HI 96813
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                Phone: (808) 123-4567
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                Email: <a href="mailto:info@lendwithaloha.com" style={{ color: "#1976d2" }}>info@lendwithaloha.com</a>
              </Typography>

              {/* Business Hours Section */}
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Business Hours
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                Monday - Friday: 9:00 AM - 6:00 PM
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                Saturday - Sunday: Closed
              </Typography>

              {/* Customer Support Section */}
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Customer Support
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                Have questions? Our customer support team is here to help.
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                Support Email: <a href="mailto:support@lendwithaloha.com" style={{ color: "#1976d2" }}>support@lendwithaloha.com</a>
              </Typography>

              {/* Social Media Section */}
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
                Connect with Us
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
                <Link href="https://www.instagram.com/lendwithaloha/" target="_blank">
                  <Instagram fontSize="large" sx={{ color: "#1976d2" }} />
                </Link>
                <Link href="https://www.facebook.com/profile.php?id=100089825320384" target="_blank">
                  <Facebook fontSize="large" sx={{ color: "#1976d2" }} />
                </Link>
                <Link href="https://www.linkedin.com/in/brianfung-lwa/" target="_blank">
                  <LinkedIn fontSize="large" sx={{ color: "#1976d2" }} />
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Map and Address Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="h-full"
            >
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  boxShadow: 3,
                  height: "100%", // Ensure it takes up full height
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, color: "#00796b" }}>
                  Visit Us
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                  Find us at the following address. You can also explore the map for directions.
                </Typography>
                <div style={{ width: "100%" }}>
                  <iframe
                    width="100%"
                    height="400"
                    frameBorder="0"
                    scrolling="no"
                    src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    title="Google Map"
                  ></iframe>
                </div>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  Address: 1 Grafton Street, Dublin, Ireland
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>


      </Container>
      {/* Footer */}
      <Box className="bg-gray-900 text-white py-4 text-center">
        <Typography variant="caption">
          &copy; 2024 Lend with Aloha. All rights reserved.
        </Typography>
      </Box>

    </>

  );
};

export default ContactForm;
