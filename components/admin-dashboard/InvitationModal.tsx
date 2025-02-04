"use client";

import React, { useState } from "react";
import { Modal, Box, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { toast } from "react-toastify";
import { useCreateInvitationMutation } from "@/store/slice/user/createInvitationApi";

const roles = [
  "superadmin",
  "admin",
  "manager",
  "loan_officer",
  "processor",
  "underwriter",
  "borrower",
  "lender",
];

const InvitationModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [role, setRole] = useState("");
  const [createInvitation, { isLoading }] = useCreateInvitationMutation();

  const handleSubmit = async () => {
    if (!role) {
      toast.error("Role is required");
      return;
    }

    try {
      const response = await createInvitation({ role }).unwrap();
      toast.success(`Invitation created! Token: ${response.token}`);
      setRole(""); // Reset role
      onClose(); // Close modal
    } catch (error: any) {
      toast.error(error.data?.error || "Failed to create invitation");
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="invitation-modal" aria-describedby="invitation-modal-description">
      <Box
        className="bg-white rounded-lg shadow-lg p-6 w-96 mx-auto mt-40"
        sx={{ outline: "none" }}
      >
        <Typography id="invitation-modal-title" variant="h6" className="mb-4">
          Create Invitation
        </Typography>
        <FormControl fullWidth className="mb-4">
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            {roles.map((roleOption) => (
              <MenuItem key={roleOption} value={roleOption}>
                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1).replace("_", " ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box className="flex justify-end space-x-2">
          <Button variant="text" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InvitationModal;
