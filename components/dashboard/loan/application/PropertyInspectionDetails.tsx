"use client";

import React, { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
} from "@mui/material";
import ReusableButton from "@/components/common_btn";

const PropertyInspectionDetails: React.FC = () => {
  const [inspectionType, setInspectionType] = useState("Virtual Inspection");
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 relative">
      {/* Alert */}
      <Alert severity="info" className="mb-6">
        Loan Application fields are locked. Changes to your loan cannot be made
        because your loan has been fully approved by Underwriting.
      </Alert>

      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Property Inspection Details
      </Typography>

      {/* Property Contact Information */}
      <Typography variant="h6" className="text-gray-700 mb-4">
        Property Contact Information
      </Typography>
      <Box
        component="form"
        className="space-y-6 max-w-3xl mx-4"
        noValidate
        autoComplete="off"
      >
        {/* Previously Used Contacts */}
        <TextField
          label="Previously used contacts (Optional)"
          defaultValue=""
          fullWidth
          variant="outlined"
        />

        {/* Contact Name */}
        <TextField
          label="Contact Name"
          defaultValue="Garrett Williamson"
          fullWidth
          variant="outlined"
          InputProps={{ readOnly: true }}
        />

        {/* Contact Phone */}
        <TextField
          label="Contact Phone"
          defaultValue="(714) 351-6939"
          fullWidth
          variant="outlined"
          InputProps={{ readOnly: true }}
        />

        {/* Contact Email */}
        <TextField
          label="Contact Email"
          defaultValue="garrett@vcohomes.com"
          fullWidth
          variant="outlined"
          InputProps={{ readOnly: true }}
        />

        {/* Property Access Instructions */}
        <TextField
          label="Property Access Instructions"
          defaultValue="Virtual inspection. Waiting on a time to inspect the property."
          fullWidth
          variant="outlined"
          InputProps={{ readOnly: true }}
        />
      </Box>

      {/* Inspection Options */}
      <Typography variant="h6" className="text-gray-700 mt-8 mb-4">
        Inspection Options
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-4">
        Based on the criteria of your client’s loan, we may need an inspection.
        Please select which type your client prefers.
      </Typography>
      <Box className="relative flex mx-5gap-8">
        {/* Radio Buttons */}
        <FormControl component="fieldset" className="flex-1">
          <FormLabel component="legend" className="sr-only">
            Inspection Options
          </FormLabel>
          <RadioGroup
            value={inspectionType}
            onChange={(e) => setInspectionType(e.target.value)}
            className="space-y-4"
          >
            {/* Virtual Inspection */}
            <FormControlLabel
              value="Virtual Inspection"
              control={<Radio />}
              label={
                <Box
                  onMouseEnter={() => setHoveredOption("Virtual Inspection")}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <Typography variant="body1" className="text-gray-800">
                    Virtual Inspection
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-600 w-[550px]"
                  >
                    For your convenience, you will be using a third-party
                    application to complete an inspection of the property on
                    your own time. The Point of Contact will receive a text on
                    their mobile phone with a link from Proxypics. At the
                    property location, please take photos as instructed within
                    the App and answer the questionnaire for the subject
                    details.
                  </Typography>
                </Box>
              }
            />

            {/* Traditional Inspection */}
            <FormControlLabel
              value="Traditional Inspection"
              control={<Radio />}
              label={
                <Box
                  onMouseEnter={() =>
                    setHoveredOption("Traditional Inspection")
                  }
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <Typography variant="body1" className="text-gray-800">
                    Traditional Inspection
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-600 w-[550px]"
                  >
                    An inspector will visit the property and take photos.
                    Occasionally, measurements of the property might be taken to
                    determine square footage. The turn time depends on property
                    access and vendor availability.
                  </Typography>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>

        {/* More Information Box */}
        <Card
          className="absolute top-0 right-0 w-80 shadow-md"
          style={{ minHeight: "200px" }}
        >
          <CardContent>
            {hoveredOption === "Virtual Inspection" && (
              <>
                <Typography variant="h6" className="text-gray-800 mb-4">
                  More Virtual Inspection Information
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  Virtual Inspections can be completed at your convenience on
                  your phone without having to schedule with an inspector.
                </Typography>
                <ul className="text-gray-600 mb-4 space-y-2 pl-4 list-disc">
                  <li>
                    You will receive a text with a link to the Proxypics App for
                    the questionnaire and photo requests.
                  </li>
                  <li>
                    Please open the link within 24 hours of receiving it to
                    download the App and acknowledge the link. If a new link is
                    needed, contact your Account Manager.
                  </li>
                </ul>
              </>
            )}
            {hoveredOption === "Traditional Inspection" && (
              <>
                <Typography variant="h6" className="text-gray-800 mb-4">
                  More Traditional Inspection Information
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  An inspector will visit the property and take photos. The
                  turn-around time depends on property access and vendor
                  availability.
                </Typography>
              </>
            )}
            {!hoveredOption && (
              <Typography variant="body2" className="text-gray-500">
                Hover over an option to see more details here.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Save and Continue Button */}
      <div className="flex justify-start mt-6">
        <ReusableButton label=" Save and Continue" />
      </div>
    </div>
  );
};

export default PropertyInspectionDetails;
