import React, { useState } from "react";
import { Button } from "@mui/material";
import InvitationModal from "./InvitationModal";

const CreateInvitationButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <div className="flex justify-center ">
      <Button
        className=" text-primaryColor border-b-2 hover:border-b-primaryColor"
        onClick={handleOpen}
      >
        Create Invitation
      </Button>
      <InvitationModal open={modalOpen} onClose={handleClose} />
    </div>
  );
};

export default CreateInvitationButton;
