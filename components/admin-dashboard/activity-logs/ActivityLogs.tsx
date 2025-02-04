import React, { useState } from "react";
import { Box, InputBase, Table, TableHead, TableRow, TableCell, TableBody, MenuItem, Button, Menu, TableContainer, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from "@/store/slice/staff-activity/activitySlice";
import { selectFilteredActivityLogs } from "@/store/slice/staff-activity/activitySlice";
import {
    FilterList,
    Search as SearchIcon,
} from "@mui/icons-material";


export const ActivitiesLog: React.FC = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTermLocal] = useState("");
    const filteredActiviesLogs = useSelector(selectFilteredActivityLogs);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTermLocal(value);
        dispatch(setSearchTerm(value));
    };

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLButtonElement);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="flex flex-col gap-4">


            <div className="flex flex-col gap-8 ">
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

                    <div className="flex max-md:flex-col max-md:items-start gap-3 justify-between items-center mb-4">
                        <Button
                            variant="outlined"
                            startIcon={<FilterList />}
                            style={{ whiteSpace: "nowrap" }}
                            onClick={handleMenuOpen}
                        >
                            Filters
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            PaperProps={{
                                style: {
                                    width: anchorEl ? anchorEl.offsetWidth : "auto", // Match Button width
                                },
                            }}
                        >
                            <MenuItem onClick={handleMenuClose}>Role</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Date</MenuItem>
                            <MenuItem onClick={handleMenuClose}>User</MenuItem>
                        </Menu>
                    </div>

                </div>
            </div>

            {/* Table */}
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>


                {/* <Table>
                    <TableHead sx={{ background: "#F9F9FC" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>Date/Time</TableCell>
                            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>User</TableCell>
                            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: "center", borderBottom: "none" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredActiviesLogs.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.dateTime || "N/A"}</TableCell>
                                <TableCell>{row.activity}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{row.action || "N/A"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> */}



                <TableContainer component={Paper} style={{ marginTop: "1.5rem" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="activity logs table" className="max-md:w-screen">
                        <TableHead >
                            <TableRow>
                                <TableCell >Date/Time</TableCell>
                                <TableCell >User</TableCell>
                                <TableCell >Role</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredActiviesLogs.length > 0 ? (
                                filteredActiviesLogs.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell >{row.dateTime || "N/A"}</TableCell>
                                        <TableCell >{row.activity}</TableCell>
                                        <TableCell >{row.role}</TableCell>
                                        <TableCell >{row.action || "N/A"}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No activity logs found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>




            



















            </Box>
        </div>
    );
};

export default ActivitiesLog;
