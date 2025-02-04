'use client'
import { Edit, Delete } from '@mui/icons-material';
import { Box, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import React, { useState } from 'react';
import { Tooltip } from '@/components/common/ToolTip';
import { usePathname } from 'next/navigation';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ViewScheduleModal from './ViewScheduleModal';

export interface ScheduleRow {
    id: number,
    propertyAddress: string
    city: string // New field
    state: string
    zipCode: string
    propertyType: string
    vesting: string
    percentageOwned: string
    investmentStrategy: string
    acquisitionDate: string
    purchasePrice: string
    acquisitionPrice: string
    currentAsIsValue: string
    budgetCompleted: string
    currentMarketValue: string
    loanBalance: string
    marketRents: string
    rentalIncome: string
    status: string
    contractPrice: string
    coe: string
}

interface ScheduleTableProps {
    scheduleRows: ScheduleRow[];
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({ scheduleRows }) => {

    const pathname = usePathname()



    const isRealEstateOwned = pathname === '/dashboard/real-estate-schedule/owned';
    const [view, setViewModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<ScheduleRow | undefined>(undefined);

    const handleRemoveView = () => {
        setViewModal(false);
        setSelectedRow(undefined);
    };

    const handleOpenView = (row: ScheduleRow) => {
        console.log(selectedRow)
        setSelectedRow(row);
        setViewModal(true);
    };



    <Box
        sx={{
            display: { xs: 'block', md: 'none' }, // Show only on mobile
        }}
    ></Box>

    return (
        <Box> <Box sx={{ p: 5, display: { xs: "none", sm: "none", md: "block" } }} >
            <Table>
                <TableHead sx={{ background: "#F9F9FC" }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>
                            Property Address
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>
                            <span className='mr-2'>Vesting</span>    <Tooltip text="What name entity title is held under.
                            
                            Example: John Smith,Smith Investements,Smith Investments LLC, Smith Investements Inc etc"> <HelpIcon /></Tooltip>
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>
                            <span className='mr-2'>Percentage Owned</span>  <Tooltip text="The percentage of ownership you have in the property"> <HelpIcon /></Tooltip>
                        </TableCell>
                        {isRealEstateOwned && (
                            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>
                                Acquisition Date
                            </TableCell>
                        )}
                        <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>
                            Purchase Price
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>
                            Current As-Is Value
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #ccc", borderBottom: "none" }}>
                            Market Rents
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center", borderBottom: "none" }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {scheduleRows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.propertyAddress}</TableCell>
                            <TableCell>{row.vesting}</TableCell>
                            <TableCell>{row.percentageOwned}</TableCell>

                            {isRealEstateOwned && <TableCell>{row.acquisitionDate}</TableCell>}

                            <TableCell>{row.purchasePrice}</TableCell>
                            <TableCell>{row.currentAsIsValue}</TableCell>
                            <TableCell>{row.marketRents}</TableCell>

                            <TableCell sx={{ textAlign: "center" }}>
                                <IconButton aria-label="edit" className="bg-background p-2 rounded-sm mx-2" onClick={() => handleOpenView(row)}>
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
            <Box
                sx={{
                    display: { xs: 'block', md: 'none' }, // Show only on mobile
                }}
            >
                {scheduleRows.map((row) => (
                    <Paper
                        key={row.id}
                        sx={{
                            padding: 2,
                            margin: 4,

                        }}
                    >
                        <Stack spacing={1}>

                            <Typography variant="body2">
                                <strong className='mr-1'>Property Address:</strong> {row.propertyAddress ?? "Property Address"}
                            </Typography>
                            <Typography variant="body2">
                                <strong className='mr-1'>Vesting:</strong> {row.vesting ?? "vesting"}
                            </Typography>
                            <Typography variant="body2">
                                <strong className='mr-1'>Percentage Owned:</strong> {row.percentageOwned ?? "percentage Owned"}
                            </Typography>

                            <Typography variant="body2">
                                <strong className='mr-1'>Acquisition Date:</strong> {row.acquisitionDate ?? "Acquisition Date"}
                            </Typography>
                            <Typography variant="body2">
                                <strong className='mr-1'>Purchase Price:</strong> {row.purchasePrice ?? "Purhase Price"}
                            </Typography>
                            <Typography variant="body2">
                                <strong className='mr-1'>Current As-Is Value	:</strong> {row.currentAsIsValue ?? "Purhase Price"}
                            </Typography>
                            <Typography variant="body2">
                                <strong className='mr-1'>Market Rents	:</strong> {row.marketRents ?? "Purhase Price"}
                            </Typography>


                            <Typography variant="body2">
                                <strong className='mr-1'>Actions	:</strong>  <IconButton aria-label="edit" className="bg-background p-2 rounded-sm mx-2" onClick={() => handleOpenView(row)}>
                                    <VisibilityOutlinedIcon />
                                </IconButton>
                                <IconButton aria-label="edit" className="bg-background p-2 rounded-sm md:mx-2">
                                    <Edit />
                                </IconButton>


                                <IconButton color="error" aria-label="delete" className="bg-background p-2 rounded-sm">
                                    <Delete />
                                </IconButton>
                            </Typography>






                        </Stack>
                    </Paper>
                ))}
            </Box>
            <ViewScheduleModal open={view} onClose={handleRemoveView} row={selectedRow} />

        </Box>



    );
};
