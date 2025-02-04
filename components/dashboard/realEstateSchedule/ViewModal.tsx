import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { AiOutlineFilePdf } from "react-icons/ai";

interface ViewModalProps {
    open: boolean;
    onClose: () => void;
    fileContent: { name: string; size: number | string; content: string | ArrayBuffer | undefined | null; };
}

const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, fileContent }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "70vw",
                    height: "90vh",
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "white",
                        zIndex: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pb: 1,
                        mb: 2,
                    }}
                >
                    <div className="flex justify-between gap-2 ">
                        <Typography variant="h1"><AiOutlineFilePdf size={30} /></Typography>


                        <div className="flex flex-col justify-start text-start"> <Typography variant="body2">{fileContent.name}</Typography>
                            <Typography variant="caption" >
                                {fileContent.size}
                            </Typography></div>
                    </div>
                    <Button onClick={onClose} sx={{ color: "black", fontSize: "1.5rem" }}>
                        &times;
                    </Button>
                </Box>

                {/* Render File Content */}
                {fileContent ? (
                    <iframe
                        src={
                            typeof fileContent?.content === "string"
                                ? fileContent.content
                                : fileContent?.content instanceof ArrayBuffer
                                    ? `data:application/octet-stream;base64,${btoa(
                                        String.fromCharCode(...new Uint8Array(fileContent.content))
                                    )}`
                                    : "about:blank"
                        }
                        title="File Viewer"
                        style={{ width: "100%", height: "100%" }}
                    />
                ) : (
                    <Typography>No file content available</Typography>
                )}

            </Box>
        </Modal>
    );
};

export default ViewModal;