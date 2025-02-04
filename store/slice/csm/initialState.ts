type Form = {
    id: string;
    label: string;
    isCompleted: boolean;
    data: Record<string, any>;
  };
  
  type ParentSection = {
    id: string;
    label: string;
    isCompleted: boolean;
    forms: Form[];
  };
  
  type ApplicationState = {
    parents: ParentSection[];
    applicationStatus: string;
    progress: number;
  };
  
  // Generate draw sections dynamically
  const generateDrawSections = (totalDraws: number): ParentSection[] => {
    const drawForms = [
      { idSuffix: 'request-your-draw-form', label: 'Request Your Draw Form' },
      { idSuffix: 'submit-your-draw-form', label: 'Submit Your Draw Form' },
      { idSuffix: 'upload-additional-evidence', label: 'Upload Additional Evidence' },
      { idSuffix: 'upload-invoice', label: 'Upload Invoice' },
      { idSuffix: 'upload-lein-waiver', label: 'Upload Lien Waiver' },
    ];
  
    return Array.from({ length: totalDraws }, (_, index) => {
      const drawNumber = index + 1;
      return {
        id: `draw-${drawNumber}`,
        label: `Draw ${drawNumber}`,
        isCompleted: false,
        forms: drawForms.map((form) => ({
          id: `draw-${drawNumber}-${form.idSuffix}`,
          label: form.label,
          isCompleted: false,
          data: {},
        })),
      };
    });
  };


export const initialState: ApplicationState = {
    parents: [
      {
        id: 'agreements',
        label: 'Agreements',
        isCompleted: false,
        forms: [
          {
            id: 'accept-construction-hold-back-process',
            label: 'Construction Hold-Back Process',
            isCompleted: false,
            data: {},
          },
          {
            id: 'accept-valuation-delivery-acknowledgement',
            label: 'Valuation Delivery Acknowledgement',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-signed-disclosures',
            label: 'Upload Signed Disclosures',
            isCompleted: false,
            data: {},
          },
        ],
      },
      {
        id: 'borrower-info',
        label: 'Borrower Info',
        isCompleted: false,
        forms: [
          {
            id: 'provide-entity-information',
            label: 'Entity Information',
            isCompleted: false,
            data: {},
          },
          {
            id: 'provide-entity-participant-information',
            label: 'Participant Information',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-borrowing-authorization-form',
            label: 'Authorization Form',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-current-formation-document',
            label: 'Formation Document',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-current-organizational-agreement',
            label: 'Organizational Agreement',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-transaction-history',
            label: 'Transaction History',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-voided-check',
            label: 'Voided Check',
            isCompleted: false,
            data: {},
          },
        ],
      },
      {
        id: 'general-info',
        label: 'General Info',
        isCompleted: false,
        forms: [
          {
            id: 'provide-loan-details',
            label: 'Loan Details',
            isCompleted: false,
            data: {},
          },
          {
            id: 'provide-property-details',
            label: 'Property Details',
            isCompleted: false,
            data: {},
          },
          {
            id: 'provide-purchase-details',
            label: 'Purchase Details',
            isCompleted: false,
            data: {},
          },
          {
            id: 'provide-real-estate-investment-experience',
            label: 'Real Estate Investment Experience',
            isCompleted: false,
            data: {},
          },
        ],
      },
      {
        id: 'guarantor-info',
        label: 'Guarantor Info',
        isCompleted: false,
        forms: [
          {
            id: 'provide-guarantor-personal-information',
            label: 'Guarantor Personal Information',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-spousal-consent-document',
            label: 'Spousal Consent Document',
            isCompleted: false,
            data: {},
          },
        ],
      },
      {
        id: 'property-info',
        label: 'Property Info',
        isCompleted: false,
        forms: [
          {
            id: 'property-inspection-details',
            label: 'Inspection Details',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-property-photos',
            label: 'Property Photos',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-signed-purchase-contract',
            label: 'Signed Purchase Contract',
            isCompleted: false,
            data: {},
          },
        ],
      },
      {
        id: 'rehab-info',
        label: 'Rehab Info',
        isCompleted: false,
        forms: [
          {
            id: 'project-summary',
            label: 'Project Summary',
            isCompleted: false,
            data: {},
          },
          {
            id: 'scope-of-work-details',
            label: 'Scope of Work Details',
            isCompleted: false,
            data: {},
          },
        ],
      },
      {
        id: 'third-party-info',
        label: 'Third Party Info',
        isCompleted: false,
        forms: [
          {
            id: 'closing-agent-info',
            label: 'Closing Agent Info',
            isCompleted: false,
            data: {},
          },
          {
            id: 'provide-hazard-insurance-agent-information',
            label: 'Hazard Insurance Agent Info',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-closing-protection-letter',
            label: 'Closing Protection Letter',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-hazard-insurance',
            label: 'Hazard Insurance',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-prelim-title',
            label: 'Prelim Title',
            isCompleted: false,
            data: {},
          },
          {
            id: 'upload-wire-instructions',
            label: 'Wire Instructions',
            isCompleted: false,
            data: {},
          },
        ],
      },
      ...generateDrawSections(9), // Add draw sections dynamically

    ],
    applicationStatus: 'Incomplete', // Default application status
    progress: 0, // Default progress
  };
  