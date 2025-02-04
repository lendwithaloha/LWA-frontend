import { Delete } from '@mui/icons-material'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import React from 'react'

export default function StaffClient() {
    const staffMembers = [
        { id: 1, name: "John Doe", role: "Property Manager", email: "johndoe@example.com", phoneNumber: "123-456-7890" },
        { id: 2, name: "Jane Smith", role: "Real Estate Investor", email: "janesmith@example.com", phoneNumber: "987-654-3210" },
        { id: 3, name: "Mike Johnson", role: "Broker", email: "mikejohnson@example.com", phoneNumber: "555-789-1234" },
    ]
    return (
        <TableContainer component={Paper} style={{ marginTop: "1.5rem" }}>
            <Table sx={{ minWidth: 350 }} aria-label="staff table" className="max-md:w-screen">
                <TableHead >
                    <TableRow>
                        <TableCell >Name</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {staffMembers.length > 0 ? (
                        staffMembers.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.email}</TableCell>
                                <TableCell sx={{ textAlign: "center", borderRight: "1px solid #ccc" }}>
                                    <IconButton aria-label="view" >
                                        <VisibilityOutlinedIcon />
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
        </TableContainer>)
}
