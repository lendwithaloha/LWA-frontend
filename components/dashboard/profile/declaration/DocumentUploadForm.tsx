import React, { useState } from "react";

const DocumentUploadForm: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState<string>("");
  const maxFiles = 3;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (files.length >= maxFiles) {
      alert("You can only upload up to 3 documents.");
      return;
    }

    const newFile = event.target.files?.[0];
    if (newFile) {
      setFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const handleFileRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 mx-auto bg-white rounded-lg">
      <label className="block text-lg font-semibold mb-4 text-gray-700">
        Provide a detailed explanation and upload any supporting documents:
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter details here..."
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div>
        <p className="text-sm text-gray-600 mb-4">You can upload up to 3 documents.</p>
        {files.length > 0 && (
          <ul className="space-y-2 mb-4">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md shadow-sm"
              >
                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                <button
                  onClick={() => handleFileRemove(index)}
                  className="text-red-500 text-sm font-semibold hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            id="fileInput"
            className="hidden"
          />
          <button
            onClick={() => document.getElementById("fileInput")?.click()}
            disabled={files.length >= maxFiles}
            className={`w-full p-3 text-white font-semibold rounded-lg transition ${
              files.length >= maxFiles
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primaryColor hover:bg-blue-600"
            }`}
          >
            Upload Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
