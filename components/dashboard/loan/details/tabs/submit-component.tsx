import { EyeIcon } from "@heroicons/react/20/solid";
import { Download, History, Search } from "@mui/icons-material";
import { Box, InputBase } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

type CustomDocument = {
  label: string;
  requirements: string[];
  submittedDate: string;
  status: "Pending" | "Approved" | "Feedback Given";
};

interface SubmittedComponentProps {
  data: CustomDocument[];
  hanldeView: () => void;
  handleHistory: (doc: CustomDocument) => void;
}

const SubmittedComponent = ({
  data,
  hanldeView,
  handleHistory,
}: SubmittedComponentProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((doc) =>
    doc.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f1f3f4",
          borderRadius: 2,
          px: 1,
          py: 0.5,
          width: "100%",
          border: "1px solid #ccc",
        }}
      >
        <Search sx={{ mr: 1, color: "gray" }} />
        <InputBase
          placeholder="Search submitted documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "100%" }}
        />
      </Box>

      {filteredData.map((doc, index) => (
        <div key={index} className="flex items-center gap-4 flex-1 mt-5">
          <Image
            src="/images/loan-icon.png"
            alt="File Icon"
            width={50}
            height={50}
          />
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">{doc.label}</h3>
              <div className="text-sm text-gray-500">
                Submitted on {doc.submittedDate}
              </div>
            </div>
            <div className="flex flex-col justify-between gap-5">
              <button className="bg-green-500 text-white rounded-lg px-2 text-sm">
                {doc.status}
              </button>
              <div className="flex gap-3">
                <div
                  className="bg-gray-200 px-2 py-1 rounded-lg"
                  onClick={hanldeView}
                >
                  <EyeIcon className="size-7" />
                </div>
                <div className="bg-gray-200 px-2 py-1 rounded-lg">
                  <Download className="size-8" />
                </div>
                <div
                  className="bg-gray-200 px-2 py-1 rounded-lg"
                  onClick={() => handleHistory(doc)}
                >
                  <History className="size-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmittedComponent;
