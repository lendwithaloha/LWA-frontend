import { useUploadFileMutation } from "@/store/slice/application/application-sclice";
import { Check } from "@mui/icons-material";
import { LuUploadCloud } from "react-icons/lu";

export function UploadZone({
  title,
  onUploadComplete,
  isUploaded,
  uploadedFileName,
}: {
  title: string;
  onUploadComplete: (fileName: string, fileId: string) => void;
  isUploaded: boolean;
  uploadedFileName?: string;
}) {
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await uploadFile(file).unwrap();
        if (response?.file_id) {
          onUploadComplete(file.name, response.file_id);
        } else {
          throw new Error("File ID is missing in the response");
        }
      } catch (error) {
        console.log("File upload failed", error);
      }
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">{title}</h3>
      <div
        className="relative rounded-lg border-2 border-dashed p-6 transition-colors
          border-gray-300 hover:border-gray-400"
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          {isUploaded ? (
            <Check className="w-10 h-10 text-green-500" />
          ) : (
            <LuUploadCloud className="w-10 h-10 text-gray-400" />
          )}
          <p className="text-sm font-medium">
            {isUploaded ? "File Selected" : "Upload your document"}
          </p>
          {isUploaded && uploadedFileName && (
            <p className="text-xs text-gray-600 mt-2">{uploadedFileName}</p>
          )}
          {!isUploaded && (
            <p className="text-xs text-gray-500">Drag and drop your file</p>
          )}
        </div>
      </div>
    </div>
  );
}
