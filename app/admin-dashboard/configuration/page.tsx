"use client";
import React, { useState } from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
  const [configs, setConfigs] = useState([
    { label: "Are you a U.S. citizen?", key: "usCitizen" },
    {
      label:
        "Have you had an ownership interest in a property in the last three years?",
      key: "ownershipInterest",
    },
    { label: "Are there any judgments against you?", key: "judgmentsAgainst" },
    {
      label: "Have you been bankrupt in the past 7 years?",
      key: "bankruptcy",
    },
    {
      label:
        "Have you had property foreclosed upon, given title or deed in lieu thereof in the past 7 years?",
      key: "foreclosure",
    },
    { label: "Are you a party to a lawsuit?", key: "lawsuit" },
    {
      label:
        "Have you been charged or found guilty of a criminal offense in the past?",
      key: "criminalOffense",
    },
    {
      label:
        "Are you presently delinquent or in default on any Federal debt or any other loan, mortgage, financial obligation, bond, or loan guarantee?",
      key: "delinquentDebt",
    },
    {
      label:
        "Have you directly or indirectly been obligated on any loan which resulted in foreclosure, transfer of title in lieu of foreclosure, or judgment?",
      key: "loanObligation",
    },
    {
      label:
        "Are you obligated to pay alimony, child support, or separate maintenance?",
      key: "alimonySupport",
    },
    {
      label: "Is any part of the down payment borrowed?",
      key: "borrowedDownPayment",
    },
    {
      label: "Are you a co-maker or endorser on a note?",
      key: "coMakerEndorser",
    },
    {
      label: "Do you intend to occupy the property as your primary residence?",
      key: "primaryResidence",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [newQuestionLabel, setNewQuestionLabel] = useState("");

  // Handle Add Button Click
  const handleAddQuestion = () => {
    if (newQuestionLabel.trim()) {
      setConfigs((prev) => [
        ...prev,
        { label: newQuestionLabel, key: uuidv4() }, // Auto-generate key
      ]);
      setNewQuestionLabel("");
      setShowPopup(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="my-4 flex justify-between items-center">
        <Typography variant="h4">Declarations</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowPopup(true)}
        >
          Add
        </Button>
      </div>

      {/* Questions List */}
      <div className="p-4 rounded-lg">
        <div className="flex flex-col gap-5">
          {configs.map(({ label, key }) => (
            <div key={key}>{label}</div>
          ))}
        </div>
      </div>

      {/* Add Question Modal */}
      <Modal
        open={showPopup}
        onClose={() => setShowPopup(false)}
        aria-labelledby="add-question-modal"
        aria-describedby="add-question-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "90%",
            maxWidth: 400,
          }}
        >
          <Typography
            id="add-question-modal"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Add New Question
          </Typography>
          <TextField
            fullWidth
            label="Question Label"
            variant="outlined"
            value={newQuestionLabel}
            onChange={(e) => setNewQuestionLabel(e.target.value)}
            placeholder="Enter question label"
            margin="normal"
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              onClick={() => setShowPopup(false)}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddQuestion}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Page;
