import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { AiOutlineFilePdf, AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import ViewModal from '../dashboard/realEstateSchedule/ViewModal';
import { setIdFile, setBankStatements } from "@/store/slice/profile/profile-setup";
import { useDispatch } from 'react-redux';


export interface UploadedFileType {
    name: string;
    size: number;
    content: string | ArrayBuffer | null; // Content as base64 string or ArrayBuffer based on your needs
}

interface FileUploadActionProps {
    file: UploadedFileType; // Expect the File object directly
    fileType: string
    indexToDelete?: number
}

export default function FileUploadAction({ file, fileType }: FileUploadActionProps) {
    const [uploadFiles, setUploadedFile] = useState<UploadedFileType | null>(null);
    const [openViewModal, setOpenViewModal] = useState(false);
    const dispatch = useDispatch()


    useEffect(() => {
        setUploadedFile(file)
    }, [file])


    // useEffect(() => {
    //     const reader = new FileReader();

    //     reader.onload = () => {
    //         setUploadedFile({
    //             name: file.name,
    //             size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
    //             content: reader.result as string,
    //         });
    //     };

    //     reader.onerror = (error) => {
    //         console.error('Error reading file:', error);
    //         setUploadedFile(null);
    //     };

    //     if (file ) {
    //         reader.readAsDataURL(file);
    //     }

    //     return () => {
    //         reader.abort();
    //     };
    // }, [file]);

    // useEffect(() => {
    //     const reader = new FileReader();

    //     reader.onload = () => {
    //         setUploadedFile({
    //             name: file.name,
    //             size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
    //             content: reader.result as string,
    //         });
    //     };

    //     reader.onerror = (error) => {
    //         console.error('Error reading file:', error);
    //         setUploadedFile(null);
    //     };

    //     if (file ) {
    //         reader.readAsDataURL(file);
    //     }

    //     return () => {
    //         reader.abort();
    //     };
    // }, [file]);





    const handleOpenView = () => setOpenViewModal(true);
    const handleCloseView = () => setOpenViewModal(false);
    const handleDeleteFile = () => {
        if (fileType === "id") {
            setUploadedFile(null)
            dispatch(setIdFile(null))
        }
        else if (fileType === "bank") {
            setUploadedFile(null)
            dispatch(setBankStatements(null))

        }
        
    }

    const handleEditFile = () => setUploadedFile(null);

    return (
        <Box sx={{ marginY: "10px" }}>
            {uploadFiles && <Box
                sx={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                }}
            >
                <div className="flex justify-between gap-2">
                    <Typography variant="h1"><AiOutlineFilePdf size={30} /></Typography>
                    <div className="flex flex-col justify-start text-start">
                        <Typography variant="body2">{uploadFiles?.name.slice(0, 20)}</Typography>
                        <Typography variant="caption">{uploadFiles?.size}</Typography>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <IconButton onClick={handleOpenView}>
                        <AiOutlineEye />
                    </IconButton>
                    <IconButton onClick={handleEditFile}>
                        <AiOutlineEdit />
                    </IconButton>
                    <IconButton onClick={handleDeleteFile}>
                        <AiOutlineDelete />
                    </IconButton>
                </div>
            </Box>}

            {uploadFiles && (
                <ViewModal
                    open={openViewModal}
                    onClose={handleCloseView}
                    fileContent={uploadFiles}
                />
            )}
        </Box>
    );
}



// useEffect(() => {
//     const reader = new FileReader();

//     reader.onload = () => {
//         setUploadedFile({
//             name: file.name,
//             size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
//             content: reader.result as string,
//         });
//     };

//     reader.onerror = (error) => {
//         console.error('Error reading file:', error);
//         setUploadedFile(null);
//     };

//     if (file ) {
//         reader.readAsDataURL(file);
//     }

//     return () => {
//         reader.abort();
//     };
// }, [file]);