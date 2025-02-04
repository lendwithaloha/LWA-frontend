import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Typography,
  Box,
  StepContent,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { lightTheme } from "@/styles/theme";
import { useSearchParams } from "next/navigation";
import { dummyData } from "@/utils/application";
import ReusableButton from "@/components/common_btn";
import ApplicationProgress from "./ApplicationProgress";

// Initial steps data
const initialSteps = [
  {
    label: "Submit Initial Application",
    description:
      "The initial review of the loan inquiry to gather basic details and determine if it meets preliminary criteria.",
    completedDate: null,
  },
  {
    label: "Conditional Approval Received",
    description:
      "Collecting necessary information and documents from the borrower to prepare a detailed quote.",
    completedDate: null,
  },
  {
    label: "Confirm Terms",
    description:
      "Providing the borrower with a detailed quote outlining terms, rates, and conditions.",
    completedDate: null,
  },
  {
    label: "Docs Sent",
    description:
      "Internal processing by the LWA team to prepare and verify the required documentation.",
    completedDate: null,
  },
  {
    label: "Signing Appointment",
    description:
      "Completing the appraisal process to assess the market value of the property for loan evaluation.",
    completedDate: null,
  },
  // {
  //   label: "Loan Closed",
  //   description:
  //     "The lender conducts further processing and underwriting based on the appraisal and collected documents.",
  //   completedDate: null,
  // },
  // {
  //   label: "Conditional Approval",
  //   description:
  //     "Granting conditional approval pending the fulfillment of specific requirements or conditions.",
  //   completedDate: null,
  // },
  // {
  //   label: "Final Approval",
  //   description:
  //     "Final review and approval of the loan after all conditions have been met.",
  //   completedDate: null,
  // },
  // {
  //   label: "Docs Out",
  //   description:
  //     "Preparation and issuance of final loan documents to the borrower for signing.",
  //   completedDate: null,
  // },
  {
    label: "Loan Closed",
    description: "Congrats! You&apos;re ready for your client&apos;s loan to be funded.",
    completedDate: null,
  },
];

export const ShowStatus = (status: number): JSX.Element => {
  let circleColor: string;

  switch (status) {
    case 1:
      circleColor = "#4caf50"; // Green for case 1
      break;
    case 2:
      circleColor = "#ff9800"; // Orange for case 2
      break;
    case 3:
      circleColor = "#f44336"; // Red
      break;
    case 4:
      circleColor = "#ffffff"; // White
      break;
    default:
      circleColor = "#9e9e9e"; // Grey for default case
  }



  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: circleColor,
        display: "inline-block",
        border: status === 4 ? "1px solid grey" : "1px solid white",
      }}
    />
  );
};

const Overview = () => {
  const [steps, setSteps] = useState(initialSteps);
  const [activeStep, setActiveStep] = useState(0);
  const id = useSearchParams().get("id");
  const data = dummyData.find((item) => item.id == id);
  useEffect(() => {
    // Update steps and set active step
    const updatedSteps = initialSteps.map((step, index) => {
      if (index > 0 && !initialSteps[index - 1].completedDate) {
        // Set subsequent steps to "TBD" if the previous step is incomplete
        return { ...step };
      }
      return step;
    });

    const firstIncompleteIndex = updatedSteps.findIndex(
      (step) => step.completedDate === null || step.completedDate === "TBD"
    );

    setSteps(updatedSteps);
    setActiveStep(firstIncompleteIndex);
  }, []);

  

  return (
    <div className="w-full flex flex-col md:flex-row gap-2">
      {/* Left Content */}
      <div className="flex flex-col gap-1 w-full md:w-2/3 p-3">
        <h1 className="text-2xl">Up Next: Property Information</h1>
        <h3 className="text-gray-700">
          Congratulations, your application is in progress. Please complete the
          checklist items below. Our team is reviewing your deal and someone
          will be in touch shortly.
        </h3>
        <ReusableButton label="  Next Step" />

        {/* Checklist */}
        <ApplicationProgress />

        <div className="w-full lg:w-3/5 mt-5 lg:mt-8 ">
          <h1 className="text-sm text-grey-200  font-bold uppercase mb-1">
            Signing Date Status
          </h1>

          <div
            className="  border-2  border-grey p-2 "
            style={{ minHeight: "400px", backgroundColor: "#e1f3f8" }}
          >
            <div className="flex flex-col gap-1">
              <h6 className="text-sm text-grey-200  font-bold uppercase mb-0">
                Estimated signing date
              </h6>
              <div className="w-full gap-3 flex flex-row p-2">
                <div className="w-1/3  " style={{ height: "60px" }}>
                  <h6
                    className=" border-2  border-grey pl-2 pb-0 text-xs"
                    style={{
                      height: "20px",
                      width: "50px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {data?.signingStatus.estimatedSigningDate.month}
                  </h6>
                  <hr style={{ width: "50px" }} />
                  <div
                    className=" pl-2 pb-2 text-lg font-bold   border-l-2  border-r-2  border-b-2   border-grey"
                    style={{
                      height: "30px",
                      width: "50px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {data?.signingStatus.estimatedSigningDate.day}{" "}
                  </div>
                </div>

                <div className="w-3/4 flex flex-col">
                  {" "}
                  <h6 className="text-sm">
                    {data?.signingStatus.estimatedSigningDate.message}
                  </h6>
                  <h6 className="mt-2 text-sm">
                    {data?.signingStatus.estimatedSigningDate.contact}{" "}
                  </h6>
                  <Link
                    href="#"
                    className="underline mt-1 text-sm "
                    style={{ color: "blue" }}
                  >
                    {" "}
                    {data?.signingStatus.estimatedSigningDate.phone}
                  </Link>
                </div>
              </div>
              <h6 className="text-sm text-grey-200  font-bold uppercase mb-0">
                Estimated Funding date
              </h6>
              <div className="w-full gap-3 flex flex-row p-2">
                <div className="w-1/3  " style={{ height: "60px" }}>
                  <h6
                    className=" border-2  border-grey pl-2 pb-2 text-xs"
                    style={{
                      height: "20px",
                      width: "50px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {data?.signingStatus.estimatedFundingDate.month}
                  </h6>
                  <hr style={{ width: "50px" }} />
                  <div
                    className=" pl-2 pb-2 text-lg font-bold   border-l-2  border-r-2  border-b-2   border-grey"
                    style={{
                      height: "30px",
                      width: "50px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {data?.signingStatus.estimatedFundingDate.day}{" "}
                  </div>
                </div>

                <div className="w-3/4 flex flex-col">
                  {" "}
                  <h6 className="text-sm">
                    {data?.signingStatus.estimatedFundingDate.message}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content: Steps */}
      <div
        className="w-full md:w-1/3 p-4"
        style={{ fontFamily: lightTheme.fonts.body }}
      >
        <Typography
          variant="h6"
          className="font-bold mb-4"
          style={{ color: lightTheme.colors.primary }}
        >
          {/* Step-by-Step Process */}
        </Typography>
        <Box>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            connector={
              <StepConnector
                sx={{
                  "& .MuiStepConnector-line": {
                    borderColor: lightTheme.colors.text,
                  },
                }}
              />
            }
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <div className="flex justify-between items-center">
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: index === activeStep ? "bold" : "normal",
                        color:
                          index === activeStep
                            ? lightTheme.colors.primary
                            : lightTheme.colors.text,
                      }}
                    >
                      {step.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color:
                          step.completedDate === "TBD"
                            ? grey[500]
                            : lightTheme.colors.text,
                      }}
                    >
                      {step.completedDate}
                    </Typography>
                  </div>
                </StepLabel>
                <StepContent>
                  <Typography
                    variant="body2"
                    style={{ color: lightTheme.colors.text }}
                  >
                    {step.description}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
    </div>
  );
};

export default Overview;
