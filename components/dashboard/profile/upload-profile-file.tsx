import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisuallyHiddenInput from "@/components/common/hidden-input";
import React from "react";

interface UploadProfileFileProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
const UploadProfileFile = ({
  onChange,
  placeholder,
}: UploadProfileFileProps) => {
  return (
    <div>
      <div className="flex mt-4 justify-between items-center">
        <Typography variant="h6" gutterBottom>
          {placeholder}
        </Typography>
        <Button
          component="label"
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={onChange} />
        </Button>
      </div>
    </div>
  );
};

export default UploadProfileFile;
