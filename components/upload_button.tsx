import React from "react";
import Button from "@mui/material/Button";
import CloudUpload from "@mui/icons-material/CloudUpload";

// Define the types for the component's props
interface FileUploadButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Type for the onChange event
  label?: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onChange,
  label = "Upload Document",
  accept = ".pdf,.doc,.docx",
  multiple = true,
  className = "bg-white text-primary border-primary hover:bg-gray-100",
  icon = <CloudUpload />,
  ...props
}) => {
  return (
    <Button
      variant="outlined"
      startIcon={icon}
      component="label"
      className={className}
      {...props}
    >
      {label}
      <input
        type="file"
        hidden
        multiple={multiple}
        onChange={onChange}
        accept={accept}
      />
    </Button>
  );
};

export default FileUploadButton;
