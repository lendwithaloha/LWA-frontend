import { EyeIcon } from "@heroicons/react/20/solid";
import {
  ArrowBack,
  ArrowBackIos,
  Download,
  Rotate90DegreesCcw,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface QuoteProps {
  id: number;
  version: string;
  documents: number;
  status?: string;
}
type CustomDocument = {
  label: string;
  requirements: string[];
  submittedDate: string;
  status: "Pending" | "Approved" | "Feedback Given";
};
const QuoteOpenHistory = ({
  data,
  onBack,
  document,
}: {
  onBack: () => void;
  data: QuoteProps;
  document: CustomDocument;
}) => {
  return (
    <div className="p-3">
      {" "}
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4 cursor-pointer mb-2">
          <div
            style={{
              width: 50,
              height: 50,
            }}
            onClick={onBack}
            className="bg-gray-200 flex items-center justify-center rounded p-2"
          >
            <ArrowBackIos className="text-center w-5 h-5" />
          </div>
          <Image
            src="/images/loan-icon.png"
            alt="File Icon"
            width={50}
            height={50}
          />
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-medium">Quote {data.id}</h3>
              <span className="px-2 py-0.5 bg-primaryColor text-white text-xs rounded-full">
                v1.0
              </span>
            </div>
            <div className="text-sm text-gray-500">Reviewed on Jan 24, 205</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-gray-300 p-2 rounded">
            <EyeIcon className="size-6" />
          </div>
          <div className="bg-gray-300 p-2 rounded">
            <Download />
          </div>
        </div>
      </div>
      <main className="px-6 py-8">
        <div className="max-w-3xl">
          {/* Back Link */}
          <Link
            href="#"
            onClick={onBack}
            className="inline-flex items-center text-sm font-medium text-gray-800 hover:text-gray-900 mb-6"
          >
            <ArrowBack className=" mx-1" />
            Back
          </Link>

          {/* Document Title */}
          <div className="flex items-center space-x-3 mb-8">
            <Image
              src="/images/loan-icon.png"
              alt="File Icon"
              width={50}
              height={50}
            />
            <div>
              <h2 className="text-lg font-medium">{document.label}</h2>
              <p className="text-sm text-gray-500">{document.submittedDate}</p>
            </div>
          </div>

          {/* Document History */}
          <div>
            <h3 className="text-sm font-medium mb-4">Document History</h3>

            {/* Upload Section */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-6">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">
                    Upload the modified document
                  </p>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-200">
                    Upload document
                  </button>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-2">Feedback</h4>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris.
                  </p>
                </div>
              </div>
            </div>

            {/* Document Entries */}
            {[1, 2].map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 mb-4"
              >
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Jan 24, 2024</p>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="flex-1">
                    <div className="flex items-start space-x-3 mb-3">
                      {/* // <FileText className="w-5 h-5 text-gray-400 mt-0.5" /> */}
                      <Image
                        src="/images/loan-icon.png"
                        alt="File Icon"
                        width={50}
                        height={50}
                      />
                      <div>
                        <p className="text-sm font-medium">Document_name.pdf</p>
                        <span className="inline-block px-3 py-1 text-xs bg-gray-100 rounded-full mt-1">
                          Current
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-8">
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                        <Rotate90DegreesCcw className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-2">Feedback</h4>
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut et massa mi. Aliquam in hendrerit urna. Pellentesque
                      sit amet sapien fringilla, mattis ligula consectetur,
                      ultrices mauris.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuoteOpenHistory;
