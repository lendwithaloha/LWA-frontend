import { SideNavLink } from "@/types/side-nav";

// src/config/sideNavLinks.ts
export const routeRoute = "/dashboard/loan/id/application";



// Function to convert number to word
function numberToWord(number: number): string {
  switch (number) {
    case 1:
      return "One";
    case 2:
      return "Two";
    case 3:
      return "Three";
    case 4:
      return "Four";
    case 5:
      return "Five";
    case 6:
      return "Six";
    case 7:
      return "Seven";
    case 8:
      return "Eight";
    case 9:
      return "Nine";
    default:
      throw new Error("Number out of range");
  }
}

// Generate draw links
export const drawLinks: SideNavLink[] = Array.from({ length: 9 }, (_, index) => {
  const drawNumber = index + 1; // Get the numeric draw number
  const drawWord = numberToWord(drawNumber); // Convert the number to its word representation

  return {
    key: `Draw ${drawWord}`,
    route: `${routeRoute}/draw-${drawNumber}`,
    children: [
      {
        key: "Request Your Draw Form",
        route: `${routeRoute}/draw-${drawNumber}/draw-${drawNumber}-request-your-draw-form`,
        status: "complete", // Matches the allowed literal type
      },
      {
        key: "Submit Your Draw Form",
        route: `${routeRoute}/draw-${drawNumber}/draw-${drawNumber}-submit-your-draw-form`,
        status: "complete",
      },
      {
        key: "Upload Invoices",
        route: `${routeRoute}/draw-${drawNumber}/draw-${drawNumber}-upload-invoice`,
        status: "complete",
      },
      {
        key: "Upload Additional Evidence (Optional)",
        route: `${routeRoute}/draw-${drawNumber}/draw-${drawNumber}-upload-additional-evidence`,
        status: "complete",
      },
      {
        key: "Upload Lien Waiver",
        route: `${routeRoute}/draw-${drawNumber}/draw-${drawNumber}-upload-lein-waiver`,
        status: "complete",
      },
    ],
  };
});

export const initialLinks: SideNavLink[] = [
  {
    key: "General Information",
    route: `${routeRoute}/general-info`,
    children: [
      {
        key: "Provide Loan Details",
        route: `${routeRoute}/general-info/provide-loan-details`,
        status: "complete",
      },
      {
        key: "Provide Property Details",
        route: `${routeRoute}/general-info/provide-property-details`,
        status: "complete",
      },
      {
        key: "Provide Real Estate Investment Experience",
        route: `${routeRoute}/general-info/provide-real-estate-investment-experience`,
        status: "complete",
      },
      {
        key: "Provide Purchase Details",
        route: `${routeRoute}/general-info/provide-purchase-details`,
        status: "complete",
      },
    ],
  },
  {
    key: "Property Information",
    route: `${routeRoute}/application/property-info`,
    children: [
      {
        key: "Property Inspection Details",
        route: `${routeRoute}/property-info/property-inspection-details`,
        status: "complete",
      },
      {
        key: "Upload Signed Purchase Contract",
        route: `${routeRoute}/property-info/upload-signed-purchase-contract`,
        status: "complete",
      },
      {
        key: "Upload Property Photos",
        route: `${routeRoute}/property-info/upload-property-photos`,
        status: "complete",
      },
    ],
  },
  {
    key: "Rehab Information",
    route: `${routeRoute}/application/rehab-info`,
    children: [
      {
        key: "Project Summary",
        route: `${routeRoute}/rehab-info/project-summary`,
        status: "complete",
      },
      {
        key: "Scope of Work Details",
        route: `${routeRoute}/rehab-info/scope-of-work-details`,
        status: "complete",
      },
    ],
  },
  {
    key: "Third Party Information",
    route: `${routeRoute}/third-party-info`,
    children: [
      {
        key: "Provide Closing Agent Information",
        route: `${routeRoute}/third-party-info/closing-agent-info`,
        status: "complete",
      },
      {
        key: "Upload Perlim Title",
        route: `${routeRoute}/third-party-info/upload-perlim-title`,
        status: "complete",
      },
      {
        key: "Upload Closing Protection Letter",
        route: `${routeRoute}/third-party-info/upload-closing-protection-letter`,
        status: "complete",
      },
      {
        key: "Upload Wire Instructions",
        route: `${routeRoute}/third-party-info/upload-wire-instructions`,
        status: "complete",
      },
      {
        key: "Provide Hazard Insurance Agent Information",
        route: `${routeRoute}/third-party-info/provide-hazard-insurance-agent-information`,
        status: "complete",
      },
      {
        key: "Upload Hazard Insurance",
        route: `${routeRoute}/third-party-info/upload-hazard-insurance`,
        status: "complete",
      },
    ],
  },
  {
    key: "Borrower Information",
    route: `${routeRoute}/borrower-info`,
    children: [
      {
        key: "Provide Entity Information",
        route: `${routeRoute}/borrower-info/provide-entity-information`,
        status: "complete",
      },
      {
        key: "Provide Entity Participant Information",
        route: `${routeRoute}/borrower-info/provide-entity-participant-information`,
        status: "complete",
      },
      {
        key: "Upload Current Formation Document",
        route: `${routeRoute}/borrower-info/upload-current-formation-document`,
        status: "complete",
      },
      {
        key: "Upload Current Organizational Agreement",
        route: `${routeRoute}/borrower-info/upload-current-organizational-agreement`,
        status: "complete",
      },
      {
        key: "Upload Borrowing Authorization Form",
        route: `${routeRoute}/borrower-info/upload-borrowing-authorization-form`,
        status: "complete",
      },
      {
        key: "Upload Transaction History",
        route: `${routeRoute}/borrower-info/upload-transaction-history`,
        status: "complete",
      },
      {
        key: "Upload Voided Check",
        route: `${routeRoute}/borrower-info/upload-voided-check`,
        status: "complete",
      },
    ],
  },
  {
    key: "Guarantor Information",
    route: `${routeRoute}/guarantor-info`,
    children: [
      {
        key: "Provide Guarantor Personal Information",
        route: `${routeRoute}/guarantor-info/provide-guarantor-personal-information`,
        status: "complete",
      },
      {
        key: "Upload Spousal Consent Document",
        route: `${routeRoute}/guarantor-info/upload-spousal-consent-document`,
        status: "complete",
      },
    ],
  },
  {
    key: "Agreements",
    route: `${routeRoute}/agreements`,
    children: [
      {
        key: "Review and Accept Construction Holdback Process",
        route: `${routeRoute}/agreements/accept-construction-hold-back-process`,
        status: "complete",
      },
      {
        key: "Review and Accept Valuation Delivery Acknowledgement",
        route: `${routeRoute}/agreements/accept-valuation-delivery-acknowledgement`,
        status: "complete",
      },
      {
        key: "Upload Signed Disclosures",
        route: `${routeRoute}/agreements/upload-signed-disclosures`,
        status: "complete",
      },
    ],
  },
  ...drawLinks, // Add all "Draw" links dynamically
];
