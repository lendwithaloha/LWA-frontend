import { UploadZone } from "@/components/upload-zone";
import React from "react";

const UpdateTab = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between ">
        <h1>Feedback</h1>
        <p className="text-xs">Jan 22, 2025</p>
      </div>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id fuga cum,
        ipsam ratione deleniti veritatis, iusto repudiandae doloribus quia
        adipisci, blanditiis iure est delectus officia. Alias sapiente delectus
        voluptas magnam!
      </p>
      <h1 className="text-lg mt-4 font-normal">Upload the updated document</h1>
      <div className="">
        <UploadZone
          title={""}
          onUploadComplete={function (): void {}}
          isUploaded={false}
        />
      </div>
    </div>
  );
};

export default UpdateTab;
