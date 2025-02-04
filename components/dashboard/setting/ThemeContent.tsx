import React, { useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ThemeTab = () => {
    const [selectedTheme, setSelectedTheme] = useState("Light");


    const handleThemeChange = (theme: React.SetStateAction<string>) => {
        setSelectedTheme(theme);
        // Optionally, update global theme provider
        // e.g., themeContext.setTheme(theme.toLowerCase());
    };

    return (
        <div style={{ display: "flex"}}>
            {/* Sidebar */}

            {/* Main Content */}
            <div style={{ flex: 1, padding: "20px" }}>
                <p>Current Theme</p>
                <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                    {/* Light Theme Card */}
                    <div
                        onClick={() => handleThemeChange("Light")}
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            cursor: "pointer",
                            backgroundColor: selectedTheme === "Light" ? "#ffffff" : "#fff",
                            textAlign: "center",
                            minWidth: "250px", // Set minimum width
                            borderRadius:"2px"

                        }}
                    >
                        <div className="flex justify-between items-center">     <h3 className="mb-2">Light</h3>                  {selectedTheme === "Light" && <CheckCircleOutlineIcon />}
                        </div>
                        <div
                            style={{
                                background: "#ffffff",
                                height: "20px",
                                border: "2px solid #f0f0f0",  // Light gray border
                                margin: "5px 0",
                                borderRadius:"2px"

                            }}
                        ></div>
                        <div
                            style={{
                                background: "#ffffff",
                                height: "20px",
                                border: "2px solid #f0f0f0",  // Light gray border
                                margin: "5px 0",
                                borderRadius:"2px"

                            }}
                        ></div>                        <div
                            style={{
                                background: "#ffffff",
                                height: "20px",
                                border: "2px solid #f0f0f0",  // Light gray border
                                margin: "5px 0",
                            }}
                        ></div>

                        <div
                            style={{
                                background: "#ffffff",
                                height: "20px",
                                border: "2px solid #f0f0f0",  // Light gray border
                                margin: "5px 0",
                            }}
                        ></div>
                    </div>

                    {/* Dark Theme Card */}
                    <div
                        onClick={() => handleThemeChange("Dark")}
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            cursor: "pointer",
                            backgroundColor: selectedTheme === "Dark" ? "#f0f8ff" : "#fff",
                            textAlign: "center",
                            minWidth: "250px", // Set minimum width
                        }}
                    >
                        <div className="flex justify-between items-center">     <h3 className="mb-2">Dark</h3>                  {selectedTheme === "Dark" && <CheckCircleOutlineIcon />} </div>
                            <div
                                style={{
                                    background: "gray",  // Light gray background
                                    height: "20px",
                                    border: "2px solid gray",  // Slightly darker gray border
                                    margin: "5px 0",
                                    borderRadius:"2px"
                                }}
                            ></div>

                            <div
                                style={{
                                    background: "gray",  // Light gray background
                                    height: "20px",
                                    border: "2px solid gray",  // Slightly darker gray border
                                    margin: "5px 0",
                                    borderRadius:"2px"

                                }}
                            ></div>

                            <div
                                style={{
                                    background: "gray",  // Light gray background
                                    height: "20px",
                                    border: "2px solid gray",  // Slightly darker gray border
                                    margin: "5px 0",
                                    borderRadius:"2px"

                                }}
                            ></div>

                            <div
                                style={{
                                    background: "gray",  // Light gray background
                                    height: "20px",
                                    border: "2px solid gray",  // Slightly darker gray border
                                    margin: "5px 0",
                                    borderRadius:"2px"

                                }}
                            ></div>

                        </div>
                    </div>
                </div>
            </div>
            );
};

            export default ThemeTab;
