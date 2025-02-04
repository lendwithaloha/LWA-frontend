'use client'
import React, { useState } from "react";
import { Box, Table, InputBase, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Edit, Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearchTerm, StaffMember } from "@/store/slice/staff-management/staffSlice";
import { selectFilteredStaffMembers } from "@/store/slice/staff-management/staffSlice";
import AddStaffMember from "../details/staff-management/AddStaffPopUp";
import {
    Search as SearchIcon,
} from "@mui/icons-material";

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
    };    const staffMembers = useSelector((state: RootState) => state.staff.staffMembers);
    const [openAddStaff, setOpenAddStaff] = useState(false);

    const handleOpenAddStaff = () => setOpenAddStaff(true);
    const handleCloseAddStaff = () => setOpenAddStaff(false);

   

    // Determine which list to display
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
                            onChange={handleSearchChange} // Handle search input
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
                </div>
            </div>

            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                <Table>
                    <TableHead sx={{ background: "#F9F9FC" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>Phone Number</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: "center", borderBottom: "none" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffToDisplay.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phoneNumber}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <IconButton aria-label="view" className="bg-background p-2 rounded-sm mx-2">
                                        <VisibilityOutlinedIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" className="bg-background p-2 rounded-sm mx-2">
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" aria-label="delete" className="bg-background p-2 rounded-sm">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </div>
    );
};
