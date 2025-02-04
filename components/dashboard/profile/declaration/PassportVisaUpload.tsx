import { Upload } from "@mui/icons-material";
import { useState, ChangeEvent } from "react";

export default function PassportVisaUpload() {
    const [passportFile, setPassportFile] = useState<File | null>(null);
    const [visaFile, setVisaFile] = useState<File | null>(null);

    const handleFileChange = (
        e: ChangeEvent<HTMLInputElement>,
        type: "passport" | "visa"
    ) => {
        const file = e.target.files?.[0] || null;
        if (type === "passport") {
            setPassportFile(file);
        } else if (type === "visa") {
            setVisaFile(file);
        }
    };

    return (
        <div className="p-6  mx-auto bg-white rounded-lg ">
            <div className="mb-6">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                    What country issued your passport?
                </label>
                <select
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none"
                >
                    <option value="">Choose ...</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                </select>
                <div className="mt-3 flex gap-3">
                      <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors gap-2 cursor-pointer">
                        <Upload className="h-4 w-4" />
                        Upload Passport
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "passport")}
                        />
                    </label>
                    {passportFile && (
                        <p className="mt-2 text-sm text-gray-600 truncate">
                            {passportFile.name}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                    What kind of visa do you have?
                </label>
                <select
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none"
                >
                    <option value="">Choose ...</option>
                    <option value="Tourist">Tourist Visa</option>
                    <option value="Work">Work Visa</option>
                    <option value="Student">Student Visa</option>
                </select>
                <div className="mt-3 flex gap-3">
                <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors gap-2 cursor-pointer">
                        <Upload className="h-4 w-4" />
                        Upload Visa
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "visa")}
                        />
                    </label>
                    {visaFile && (
                        <p className="mt-2 text-sm text-gray-600 truncate">
                            {visaFile.name}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
