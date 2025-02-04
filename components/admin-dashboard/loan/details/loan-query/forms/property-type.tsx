"use client";
import { useState } from "react";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { LoanQueryFormData } from "../loan-query";
import { IoHelpCircle } from "react-icons/io5";

interface PropertyTypeProps {
  formData: LoanQueryFormData;
  handleChange: (
    name: keyof LoanQueryFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PropertyType({
  formData,
  handleChange,
}: PropertyTypeProps) {
  const showafter = formData.layoutChanges === "yes";
  const [showAdu, setShowAdu] = useState(false);

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-3 items-center gap-4 mb-6">
          <h3 className="text-lg font-medium">Property Type</h3>

          <p className="text-sm font-medium text-center">Current</p>
          <p className="text-sm font-medium text-center">After Completion</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <span className="text-sm font-medium">Total Bedrooms</span>
          <TextField
            size="small"
            name="totalBedrooms"
            value={formData.totalBedrooms}
            onChange={handleChange("totalBedrooms")}
            className="w-full"
            disabled
          />
          {showafter && (
            <TextField
              size="small"
              name="afterBedrooms"
              value={formData.afterBedrooms}
              onChange={handleChange("afterBedrooms")}
              className="w-full"
              placeholder="Enter here ..."
            />
          )}
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <span className="text-sm font-medium">Total Bathrooms</span>
          <TextField
            size="small"
            name="totalBathrooms"
            value={formData.totalBathrooms}
            onChange={handleChange("totalBathrooms")}
            className="w-full"
            disabled
          />
          {showafter && (
            <TextField
              size="small"
              name="afterBathrooms"
              value={formData.afterBathrooms}
              onChange={handleChange("afterBathrooms")}
              className="w-full"
              placeholder="Enter here ..."
            />
          )}
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <span className="text-sm font-medium">Total Number of Units</span>
          <TextField
            size="small"
            name="totalUnits"
            value={formData.totalUnits}
            onChange={handleChange("totalUnits")}
            className="w-full"
            disabled
          />
          {showafter && (
            <TextField
              size="small"
              name="afterUnits"
              value={formData.afterUnits}
              onChange={handleChange("afterUnits")}
              className="w-full"
              placeholder="Enter here ..."
            />
          )}
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total Number of ADUs</span>
            <IconButton onClick={() => setShowAdu(!showAdu)}>
              <IoHelpCircle className="size-6 text-gray-8ss00" />
            </IconButton>
          </div>
          <TextField
            size="small"
            name="totalADUs"
            value={formData.totalADUs}
            onChange={handleChange("totalADUs")}
            className="w-full"
            disabled
          />
          {showafter && (
            <TextField
              size="small"
              name="afterADUs"
              value={formData.afterADUs}
              onChange={handleChange("afterADUs")}
              className="w-full"
              placeholder="Enter here ..."
            />
          )}
        </div>
      </div>
      {showAdu && (
        <div className="pt-7">
          <h1 className="font-medium mb-2">
            ADU are accessor dwelling units also known as mother-in-law suites{" "}
            that are distictly different on county records than a formal unit
          </h1>
          <p className="text-gray-500">
            For example, a single family home with an ADU is NOT a duplex unless
            there is documentation from the county confirming that they are
            recognizing the ADU as a unit. Appraisers will also count ADUS
            toward amenities rather than toward unit count.
          </p>
        </div>
      )}
    </div>
  );
}
