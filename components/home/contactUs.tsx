"use client";

import React from "react";
import { TextField, Button, Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";

const ContactForm = () => {
    return (
        <Box
            sx={{
                p: 4,
                backgroundColor: "#f5f5f5",
                minHeight: "100vh",
            }}
        >
            <Typography
                variant="h2"
                align="center"
                sx={{
                    mb: 4,
                    fontWeight: 700,
                    color: "#333",
                    letterSpacing: "1px",
                }}
            >
                Contact Us
            </Typography>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                {/* Contact Form Section */}
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                backgroundColor: "white",
                                boxShadow: 3,
                            }}
                        >
                            <Typography variant="h4" gutterBottom sx={{ color: "#00796b" }}>
                                We&apos;d Love to Hear From You!
                            </Typography>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                gutterBottom
                                sx={{ mb: 3 }}
                            >
                                Whether you have a question, feedback, or just want to say hello,
                                feel free to reach out. Our team will get back to you as soon as
                                possible.
                            </Typography>
                            <Box
                                component="form"
                                action="https://formspree.io/f/mnnqlelk"
                                method="POST"
                                sx={{
                                    mt: 2,
                                }}
                            >
                                <TextField
                                    label="Full Name"
                                    name="name"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    label="Your Email"
                                    type="email"
                                    name="email"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    label="Phone Number"
                                    type="tel"
                                    name="phone"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                />
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
                        </Paper>
                    </motion.div>
                </Grid>

                {/* Map and Address Section */}
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                textAlign: "center",
                                boxShadow: 3,
                            }}
                        >
                            <Typography variant="h5" sx={{ mb: 2, color: "#00796b" }}>
                                Visit Us
                            </Typography>
                            <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                                Find us at the following address. You can also explore the map for
                                directions.
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
        </Box>
    );
};

export default ContactForm;
