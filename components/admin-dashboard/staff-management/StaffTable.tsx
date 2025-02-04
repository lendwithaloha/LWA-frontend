'use client'
import React, { useState } from "react";
import { Box, Table, InputBase, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, TableContainer } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Edit, Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearchTerm, StaffMember } from "@/store/slice/staff-management/staffSlice";
import { selectFilteredStaffMembers } from "@/store/slice/staff-management/staffSlice";
import AddStaffMember from "./AddStaffPopUp";
import {
    Search as SearchIcon,
} from "@mui/icons-material";
import StaffDetail from "./StaffDetail";


interface StaffTableProps {
    scheduleRows: StaffMember[];
}

export const StaffTable: React.FC<StaffTableProps> = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTermLocal] = useState("");
    const filteredStaffMembers = useSelector(selectFilteredStaffMembers);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTermLocal(value);
        dispatch(setSearchTerm(value));
    }; const staffMembers = useSelector((state: RootState) => state.staff.staffMembers);
    const [openAddStaff, setOpenAddStaff] = useState(false);
    const [openStaffDetail, setOpenDetailStaff] = useState(false);


    const handleOpenAddStaff = () => setOpenAddStaff(true);
    const handleCloseAddStaff = () => setOpenAddStaff(false);

    const handleOpenDetailStaff = () => setOpenDetailStaff(true);
    const handleCloseDetailStaff = () => setOpenDetailStaff(false);





    const staffToDisplay = searchTerm.length > 0 ? filteredStaffMembers : staffMembers;

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-col gap-4 ">
                <div className="flex justify-between">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#f1f3f4",
                            borderRadius: 2,
                            px: 1,
                            py: 1,
                            width: "100%",
                            maxWidth: "50%",
                            border: "1px solid #ccc",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <SearchIcon sx={{ mr: 1, color: "gray" }} />
                        <InputBase
                            placeholder="Search ..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            sx={{ width: "100%" }}
                        />
                    </Box>
                    <button
                        onClick={handleOpenAddStaff}
                        className="bg-primaryColor text-white rounded-md w-32 h-8 md:w-44 md:h-11"
                    >
                        Add Staff
                    </button>
                    <AddStaffMember open={openAddStaff} onClose={handleCloseAddStaff} />
                    <StaffDetail open={openStaffDetail} onClose={handleCloseDetailStaff} />
                </div>
            </div>

            <TableContainer component={Paper} style={{ marginTop: "1.5rem" }}>
                <Table sx={{ minWidth: 650 }} aria-label="staff table" className="max-md:w-screen">
                    <TableHead >
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell >Role</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Phone Number</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffToDisplay.length > 0 ? (
                            staffToDisplay.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell >{row.name}</TableCell>
                                    <TableCell >{row.role}</TableCell>
                                    <TableCell >{row.email}</TableCell>
                                    <TableCell >{row.phoneNumber}</TableCell>
                                    <TableCell sx={{ textAlign: "center", borderRight: "1px solid #ccc" }}>
                                        <IconButton aria-label="view" onClick={handleOpenDetailStaff}>
                                            <VisibilityOutlinedIcon />
                                        </IconButton>
                                        <IconButton aria-label="edit" >
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" aria-label="delete" >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No staff members found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};
