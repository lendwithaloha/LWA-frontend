import { IconButton, Modal } from "@mui/material";
import Image from "next/image";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
interface FilePreviewModalProps {
  previewFile: string | null;
  onClose: () => void;
}
const FilePreviewModal = ({ previewFile, onClose }: FilePreviewModalProps) => {
  return (
    <div>
      <Modal
        open={previewFile !== null}
        onClose={() => onClose()}
        className="flex justify-center items-center"
        hideBackdrop
      >
        <div className="bg-gray-50  rounded w-[75%] border shadow-lg px-2">
          {previewFile && (
            <div className="flex flex-col items-center">
              <div className="flex justify-between w-full items-center p-1">
                <h2 className="text-lg font-semibold ">File Preview</h2>
                <IconButton
                  onClick={() => onClose()}
                  className=" bg-gray-300 text-black"
                >
                  <IoCloseOutline className="size-6" />
                </IconButton>
              </div>
              {previewFile.match(/\.(jpeg|jpg|gif|png)$/) ? (
                <Image
                  src={previewFile}
                  alt="Preview"
                  width={500}
                  height={600}
                  className="border"
                />
              ) : (
                <iframe
                  src={previewFile}
                  width="100%"
                  height="650"
                  className="border"
                />
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FilePreviewModal;
