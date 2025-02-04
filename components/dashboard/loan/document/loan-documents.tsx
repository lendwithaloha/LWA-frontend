import {
  DownloadOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const LoanDocument = ({ names, title }: { names: string[]; title: string }) => {
  return (
    <Box mt={3}>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        {title}
      </Typography>
      {names.map((name,index) => (
        <div key={index}  className="border-b p-3 break-all flex fle-row flex-wrap  justify-between items-center my-2 ml-4 underline cursor-pointer rounded text-gray-600 hover:bg-gray-200 group overflow-clip">
          <p>{name}</p>
          <DownloadOutlined className="invisible group-hover:visible" />
        </div>
      ))}
    </Box>
  );
};

export default LoanDocument;
