"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { dummyData } from "@/utils/application";
import { Team } from "@/utils/model/team.model";
import { lightTheme } from "@/styles/theme";

// Dummy Data
// const teamData = {
//   LWA: [
//     {
//       name: "Michael Rico",
//       role: "Account Manager",
//       email: "michael.rico@lwa.com",
//     },
//   ],
//   thirdParty: [
//     {
//       name: "Mike Rybinski",
//       role: "Insurance",
//       email: "mike.rybinski@insurance.com",
//     },
//     {
//       name: "Teresa Pasiak",
//       role: "Closing",
//       email: "teresa.pasiak@closing.com",
//     },
//   ],
// };

// const messages = [
//   {
//     id: 1,
//     sender: "Michael Rico",
//     timestamp: "2024-11-20 14:32",
//     content: "Please review the updated documentation.",
//   },
//   {
//     id: 2,
//     sender: "Teresa Pasiak",
//     timestamp: "2024-11-19 10:15",
//     content: "The closing process is on track for the planned date.",
//   },
// ];

const TeamAndMessages: React.FC = () => {
  const id = useSearchParams().get("id");
  const data = dummyData.find((item) => item.id === id);

  const teamData: Team = data?.team as Team;
  const messageLength = teamData.message.length;
  return (
    <Box
      sx={{
        padding: "72px",

        background: lightTheme.colors.background,
      }}
    >
      {/* Your Team Section */}
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: "16px" }}>
        Your Team
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Wrap if necessary
          gap: "16px", // Spacing between cards
          marginBottom: "24px", // Space before the next section
        }}
      >
        {teamData?.teamMember.map((member, index) => (
          <Box
            key={index}
            sx={{
              padding: "40px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0", // Subtle border
              width: "fit-content",
              minWidth: "200px", // Ensure consistent minimum width
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              {member.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {member.role}
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{ marginTop: "8px", cursor: "pointer" }}
            >
              {member.email}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Third Party Section */}
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: "16px" }}>
        Third Party
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Wrap if necessary
          gap: "16px", // Spacing between cards
          marginBottom: "24px", // Space before the next section
        }}
      >
        {teamData?.thirdPartyContact.map((member, index) => (
          <Box
            key={index}
            sx={{
              padding: "40px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0", // Subtle border
              width: "fit-content",
              minWidth: "200px", // Ensure consistent minimum width
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              {member.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {member.role}
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{ marginTop: "8px", cursor: "pointer" }}
            >
              {member.email}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Messages Section */}
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ marginTop: "32px", marginBottom: "16px" }}
      >
        Messages
      </Typography>
      {teamData.message.length > 0 ? (
        <Box>
          {teamData.message.map((message, index) => (
            <Box key={index} sx={{ padding: "16px 0" }}>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginBottom: "4px" }}
              >
                {message.sender}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginBottom: "8px", fontSize: "12px" }}
              >
                {new Date(message.timestamp).toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                {message.content}
              </Typography>
              {index < messageLength - 1 && (
                <Divider sx={{ marginTop: "8px", width: "218px" }} />
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            padding: "32px",
            textAlign: "center",
            width: "20%",
          }}
        >
          <Typography variant="body1" color="textSecondary">
            You don&apos;t have any messages yet.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Your team may send you updates here.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TeamAndMessages;
