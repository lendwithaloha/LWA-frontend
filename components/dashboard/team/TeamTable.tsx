'use client'
import { Edit, Delete } from '@mui/icons-material'
import { Box, IconButton, Paper, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow,Table, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditDialog from './EditContact'
import DeleteModal from './DeleteModal'
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { removeTeam, updateTeam } from '@/store/slice/team/teamSlice'
import { teamAgent } from '@/types/agent-team/team'



interface TeamTableProps {
    teamData: teamAgent[];
}

export const TeamTable: React.FC<TeamTableProps> = () => {
  const teamDatas = useSelector((state: RootState) => state.teams.teams);
  const [selectedTeam, setSelectedTeam] = useState<teamAgent | null>(null);
  const dispatch = useDispatch();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | null>('');

  const handleOpenEdit = (row: teamAgent) => {
    setSelectedTeam(row);
    setOpenEditDialog(true);
  };

  const handleCloseEdit = () => setOpenEditDialog(false);

  const handleDeleteOpenDialog = (id: string) => {
    setSelectedRowId(id);
    setDeleteDialog(true);
  };

  const handleUpdateTeam = (updatedTeam: teamAgent) => {
    dispatch(updateTeam(updatedTeam));
  };

  const handleDeleteCloseDialog = () => setDeleteDialog(false);

  const handleConfirmDelete = () => {
    if (selectedRowId !== null) {
      dispatch(removeTeam(selectedRowId));
    }
    setDeleteDialog(false);
  };

  return (
    <Box
      className="p-4 md:p-8"
      sx={{
        backgroundColor: '#f4f6f9',
      
      }}
    >
 

      {/* Desktop Table View */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          display: { xs: 'none', md: 'block' }, // Show only on md and above
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f1f3f5' }}>
              <TableCell sx={{ fontWeight: 600 }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Company Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Contact Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamDatas.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  '&:hover': { backgroundColor: '#f9f9fc' },
                }}
              >
                <TableCell>{row.firstName} {row.lastName}</TableCell>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.contactType}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    sx={{ marginRight: 1, backgroundColor: '#e3f2fd', ':hover': { backgroundColor: '#bbdefb' } }}
                    onClick={() => handleOpenEdit(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    sx={{ backgroundColor: '#ffebee', ':hover': { backgroundColor: '#ffcdd2' } }}
                    onClick={() => handleDeleteOpenDialog(row.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile View - Cards */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' }, // Show only on mobile
        }}
      >
        {teamDatas.map((row) => (
          <Paper
            key={row.id}
            sx={{
              padding: 2,
              marginBottom: 2,
          
            }}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle1" fontWeight={600}>
                {row.firstName} {row.lastName}
              </Typography>
              <Typography variant="body2">
                <strong>Company:</strong> {row.companyName}
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> {row.phoneNumber}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {row.email}
              </Typography>
              <Typography variant="body2">
                <strong>Contact Type:</strong> {row.contactType}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton
                  aria-label="edit"
                  sx={{
                    backgroundColor: '#e3f2fd',
                    ':hover': { backgroundColor: '#bbdefb' },
                  }}
                  onClick={() => handleOpenEdit(row)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  sx={{
                    backgroundColor: '#ffebee',
                    ':hover': { backgroundColor: '#ffcdd2' },
                  }}
                  onClick={() => handleDeleteOpenDialog(row.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Box>

      <EditDialog
        open={openEditDialog}
        onClose={handleCloseEdit}
        team={selectedTeam}
        onUpdate={handleUpdateTeam}
      />
      <DeleteModal
        open={deleteDialog}
        onClose={handleDeleteCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};


