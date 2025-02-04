import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
    AiOutlineFilePdf,
    AiOutlineEye,
    AiOutlineEdit,
    AiOutlineDelete,
} from "react-icons/ai";

interface FileData {
    name: string;
    type: string;
    size: number;
}

interface FileUploaderProps {
    file: FileData;

}

const FileUploader: React.FC<FileUploaderProps> = ({
    file
}) => {
    return (
        <>
            <Box
                sx={{
                    border: "1px solid #ccc",
                    marginY: "15px",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <div className="flex justify-between gap-2">
                    <Typography variant="h1">
                        <AiOutlineFilePdf size={30} />
                    </Typography>
                    <div className="flex flex-col justify-start text-start">
                        <Typography variant="body2">{file?.name}</Typography>
                        <Typography variant="caption">            {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </Typography>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <IconButton >
                        <AiOutlineEye />
                    </IconButton>
                    <IconButton >
                        <AiOutlineEdit />
                    </IconButton>
                    <IconButton >
                        <AiOutlineDelete />
                    </IconButton>
                </div>
            </Box>

        </>
    );
};

export default FileUploader;
