import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import { ScheduledEntities } from "./ScheduledEntries";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlineFilePdf } from "react-icons/ai";
import ViewModal from "./ViewModal";
import { Tooltip } from "@/components/common/ToolTip";
import HelpIcon from '@mui/icons-material/Help';

interface ImportScheduleModalProps {
    open: boolean;
    onClose: () => void;
}

export const ImportSchedule: React.FC<ImportScheduleModalProps> = ({ open, onClose }) => {
    const [openEntitiesDialog, setopenEntitiesDialog] = useState(false)
    const handleCloseEntitiesDialog = () => setopenEntitiesDialog(false)
    const handleOpenEntitiesDialog = () => setopenEntitiesDialog(true)
    const [openViewModal, setOpenViewModal] = useState(false)
    const handleOpenView = () => setOpenViewModal(true)
    const handleCloseView = () => setOpenViewModal(false)

    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);


    const handleImportClick = () => {
        handleOpenEntitiesDialog();
        setTimeout(() => {
            onClose();
        }, 50000);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                setUploadedFile({
                    name: file.name,
                    size: (file.size / 1024 / 1024).toFixed(2) + " MB",
                    content: reader.result as string,
                });
            };

            reader.readAsDataURL(file);
        }
    };


    const handleDeleteFile = () => setUploadedFile(null);

    const handleEditFile = () => setUploadedFile(null);

    interface UploadedFile {
        name: string;
        size: string;
        content: string;

    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: "80%", md: "35vw" },

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
                    <Typography variant="h6" fontWeight="bold">
                        Add Schedule of Real Estate
                    </Typography>
                    <Button onClick={onClose} sx={{ color: "black", fontSize: "1.5rem" }}>
                        &times;
                    </Button>
                </Box>

                {/* Upload Section */}
                {!uploadedFile ? (
                    <Box
                        sx={{
                            border: "2px dashed #ccc",
                            borderRadius: 2,
                            p: 4,
                            mb: 2,
                            textAlign: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => document.getElementById("file-input")?.click()}
                    >
                        <input
                            type="file"
                            id="file-input"
                            style={{ display: "none" }}
                            accept=".pdf"
                            onChange={handleFileUpload}
                        />

                        <Typography variant="body1" color="textSecondary">
                            Upload your document
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Drag and drop your file
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                        }}
                    >
                        <div className="flex justify-between gap-2 ">
                            <Typography variant="h1"><AiOutlineFilePdf size={30} /></Typography>


                            <div className="flex flex-col justify-start text-start"> <Typography variant="body2">{uploadedFile.name}</Typography>
                                <Typography variant="caption" >
                                    {uploadedFile.size}
                                </Typography></div>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <IconButton onClick={() => handleOpenView()}>
                                <AiOutlineEye />
                            </IconButton>
                            <IconButton onClick={handleEditFile}>
                                <AiOutlineEdit />
                            </IconButton>
                            <IconButton onClick={handleDeleteFile}>
                                <AiOutlineDelete />
                            </IconButton>
                        </div>
                    </Box>
                )}

                {/* Instructions */}
                <Typography variant="body1" fontWeight="bold" mb={1} align="left">
                    Instructions
                </Typography>

                <Box sx={{ textAlign: "left", mb: 2, display: "flex", justifyContent: "space-between" }}>
                    <Box>

                        <Box display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: "#6c757d",
                                    borderRadius: "50%",
                                    marginRight: 1.5,


                                }}
                            />
                            <Typography variant="body2" fontWeight="500"
                            >
                                Required columns:
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
                            - Property Address
                        </Typography>
                        <div className="flex items-center gap-3 "><Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
                            - Vesting  </Typography>   <Tooltip text="What name entity title is held under.
                            
                            Example: John Smith,Smith Investements,Smith Investments LLC, Smith Investements Inc etc"> <HelpIcon /></Tooltip></div>

                        <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
                            - Percentage Owned
                        </Typography>
                        <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
                            - Acquisition Date
                        </Typography>
                        <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
                            - Purchase Price
                        </Typography>
                        <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
                            - Current As Is Value
                        </Typography>
                        <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
                            - Market Rents
                        </Typography>
                    </Box>


                    <Box sx={{ width: "60%", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <Box display="flex" alignItems="center" >
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: "#6c757d",
                                    borderRadius: "50%",
                                    marginRight: 1.5,
                                }}
                            />
                            <Typography variant="body2" fontWeight="400"
                            >
                                Ensure the columns are arranged in the specified order.
                            </Typography>
                        </Box>




                        <Box display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: "#6c757d",
                                    borderRadius: "50%",
                                    marginRight: 1.5,
                                }}
                            />
                            <Typography variant="body2" fontWeight="400">
                                Avoid adding additional columns or data outside the required structure.
                            </Typography>
                        </Box>

                    </Box>


                </Box>



                <Typography variant="body1" mt={6} mb={1} align="left">
                    For better understanding, download the sample file to see the required structure and format.
                </Typography>







                {/* Buttons */}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", my: 3, gap: "20px" }}>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            width: { md: "50%" },
                            color: "black",
                            border: `1px solid primaryColor`,
                        }}
                        className="xs:px-10 xs:py-3"
                    >
                        Download Sample File
                    </Button>

                    <Button className="sm:px-10 xs:py-3 md:w-1/2 bg-primaryColor text-white rounded-sm "
                        onClick={handleImportClick}

                    >
                        Import
                    </Button>


                </Box>
                <ScheduledEntities open={openEntitiesDialog} onClose={handleCloseEntitiesDialog} />
                {uploadedFile && (
                    <ViewModal
                        open={openViewModal}
                        onClose={handleCloseView}
                        fileContent={uploadedFile}
                    />
                )}



            </Box>
        </Modal>
    );
};
