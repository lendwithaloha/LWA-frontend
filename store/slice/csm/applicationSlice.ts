import { lineItems } from '@/app/dashboard/loan/[id]/application/rehab-info/scope-of-work-details/lineItemsData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubTabState {
    fields: { [key: string]: any }; // Dynamic fields for sub-tabs
    isFormCompleted: boolean; // Indicates if the sub-tab is completed
}

interface TabState {
    status: string;
    subTabs: { [subTabKey: string]: SubTabState };
    isTabCompleted: boolean; // Indicates if all sub-tabs in this tab are completed
}

interface ApplicationState {
    tabs: { [tabKey: string]: TabState };
    isApplicationSubmitted: boolean; // Overall application status
}
export interface LineItem {
    id: number;
    title: string;
    budget: number;
    descriptionType: "options" | "text";
    descriptionValue?: string;
    descriptionOptions?: string[];
    selectedDescription?: string;
    tooltip: string;
}

interface LineItemsState {
    lineItems: LineItem[];
    subtotal: number;
    contingency: number;
    totalCost: number;
}

const initialLineItems = lineItems as LineItem[]


const calculateSummary = (lineItems: LineItem[]) => {
    const subtotal = lineItems.reduce((acc, item) => acc + item.budget, 0);
    const contingency = subtotal * 0.05; // 5% contingency
    const totalCost = subtotal + contingency;
    return { subtotal, contingency, totalCost };
};;


// Initial state structure
const initialState: ApplicationState = {
    tabs: {
      agreements: {
        status: "Not Started", // Initial status
        subTabs: {
          holdBackProcess: {
            fields: {
              acceptedLendHoldbackProcess: false,
            },
            isFormCompleted: false,
          },
          signedDisclosures: {
            fields: {
              uploadedDocuments: [],
            },
            isFormCompleted: false,
          },
          valuationDeliveryAcknowledgement: {
            fields: {
              acknowledgedECOAValuationRule: false,
            },
            isFormCompleted: false,
          },
        },
        isTabCompleted: false,
      },
      borrowerInfo: {
        status: "Not Started", // Initial status
        subTabs: {
          borrowingAuthorization: {
            fields: {
              uploadedDocuments: [],
            },
            isFormCompleted: false,
          },
          currentFormationDoc: {
            fields: {
              uploadedDocuments: [],
            },
            isFormCompleted: false,
          },
          entityInfo: {
            fields: {
              formData: {
                entityName: "",
                email: "",
                entityType: "Limited Liability Company",
                stateOfIncorporation: "CA",
                einNumber: "",
                address1: "",
                address2: "",
                city: "",
                state: "CA",
                zip: "",
                mailingDifferent: false,
                foreclosureDate: "",
                signerDifferentEntity: "No",
                signerName: "",
                signerTitle: "",
              },
              alertVisible: false,
            },
            isFormCompleted: false,
          },
          entityParticipantInfo: {
            fields: {
              formData: {
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                ssn: "",
                email: "",
              },
              alertVisible: false,
            },
            isFormCompleted: false,
          },
          organizationAgreement: {
            fields: {
              uploadedDocuments: [],
              alertVisible: false,
            },
            isFormCompleted: false,
          },
          transactionHistory: {
            fields: {
              uploadedDocuments: [],
            },
            isFormCompleted: false,
          },
          voidedCheck: {
            fields: {
              uploadedDocuments: [],
            },
            isFormCompleted: false,
          },
        },
        isTabCompleted: false,
      },
      generalInfo: {
        status: "Not Started", // Initial status
        subTabs: {
          loanDetails: {
            fields: {
              loanPurpose: "",
              purchasePrice: 0,
              propertyValueAsIs: 0,
              isRehabFundRequested: true,
              rehabAmount: 0,
              propertyValueAfterRepair: 0,
              sellerConcessions: 0,
              assignmentFees: 0,
            },
            isFormCompleted: false,
          },
          propertyDetails: {
            fields: {
              address: "",
              propertyType: "",
              isOccupied: false,
              isPurchaseContractAccepted: true,
              contactEndDate: "",
            },
            isFormCompleted: false,
          },
          purchaseDetails: {
            fields: {
              saleType: "",
              rehabAmountRequested: "$134,200",
              totalCost: "$134,240",
              estimatedDays: 120,
              exitStrategy: "Rehab and sell",
            },
            isFormCompleted: false,
          },
          realEstateExperience: {
            fields: {
              numPropertiesExited: 0,
            },
            isFormCompleted: false,
          },
        },
        isTabCompleted: false,
      },
      guarantorInfo: {
        status: "Not Started", // Initial status
        subTabs: {
          guarantorPersonalInfo: {
            fields: {
              isGuarantor: false,
              firstName: "",
              lastName: "",
              phoneNumber: "",
              alternatePhoneNumber: "",
              emailAddress: "",
              citizenshipStatus: "US Citizen",
              residencyStatus: "",
              ssn: "",
              dob: "",
              maritalStatus: "Single",
              spouseName: "",
              estimatedCreditScore: 0,
              numberOfDeliquencies: 0,
              bankruptcyDischargeDate: "",
              addressLine1: "",
              addressLine2: "",
              city: "",
              state: "",
              zipCode: "",
              isMailingAddressDifferent: false,
            },
            isFormCompleted: false,
          },
          spousalConsent: {
            fields: {
              uploadedDocuments: [],
              isFormCompleted: false,
              isApplicationSubmitted: false,
            },
            isFormCompleted: false,
          },
        },
        isTabCompleted: false,
      },
      propertyInfo: {
        status: "Not Started", // Initial status
        subTabs: {
          propertyInspection: {
            fields: {
              contactName: "",
              contactPhone: "",
              contactEmail: "",
              accessInstructions: "",
              inspectionType: "",
            },
            isFormCompleted: false,
          },
          propertyPhoto: {
            fields: {
              uploadedDocuments: [],
            },
            isFormCompleted: false,
          },
          signedPurchaseContract: {
            fields: {
              uploadedDocuments: [],
            },
            isFormCompleted: false,
          },
        },
        isTabCompleted: false,
      },
      rehabInfo: {
        status: "Not Started", // Initial status
        subTabs: {
          lineItems: {
            fields: {
              lineItems: initialLineItems,
              ...calculateSummary(initialLineItems),
            },
            isFormCompleted: false,
          },
          projectSummary: {
            fields: {
              projectDescription: "",
              targetQuality: "Custom/High",
              propertyOccupied: false,
              currentAboveGroundSqFt: 1415,
              currentAboveGroundBedrooms: 3,
              currentAboveGroundBathrooms: 2,
              currentAboveGroundLivingrooms: 1,
              currentBelowGroundSqFt: 0,
              currentBelowGroundBedrooms: 0,
              currentBelowGroundBathrooms: 0,
              currentBelowGroundLivingrooms: 0,
              rehabbedAboveGroundSqFt: 1415,
              rehabbedAboveGroundBedrooms: 3,
              rehabbedAboveGroundBathrooms: 2,
              rehabbedAboveGroundLivingrooms: 1,
              rehabbedBelowGroundSqFt: 0,
              rehabbedBelowGroundBedrooms: 0,
              rehabbedBelowGroundBathrooms: 0,
              rehabbedBelowGroundLivingrooms: 0,
            },
            isFormCompleted: false,
          },
        },
        isTabCompleted: false,
      },
      thirdPartyInfo: {
        status: "Not Started", // Initial status
        subTabs: {
          closingAgent: {
            fields: {
              contactName: "John Doe",
              contactPhone: "(123) 456-7890",
              contactEmail: "john.doe@example.com",
              alertVisible: false,
            },
            isFormCompleted: false,
          },
          hazardInsuranceAgent: {
            fields: {
              formData: {
                name: "",
                phone: "",
                email: "",
              },
              alertVisible: false,
            },
            isFormCompleted: false,
          },
          hazardInsurance: {
            fields: {
              uploadedDocuments: [],
              alertVisible: false,
            },
            isFormCompleted: false,
          },
          perlimTitle: {
            fields: {
              uploadedDocuments: [],
              alertVisible: false,
            },
            isFormCompleted: false,
          },
          wireInstruction: {
            fields: {
              uploadedDocuments: [
                {
                  name: "Title_-_Wire_Instructions.pdf",
                  uploadedDate: "2024-08-13",
                },
              ],
              alertVisible: false,
            },
            isFormCompleted: false,
          },
        },
        isTabCompleted: false,
      },
    },
    isApplicationSubmitted: false,
  };
  

interface UpdateFieldPayload {
    tabKey: string;
    subTabKey: string;
    fieldName: string | number;
    value: any;
}

interface FileUploadPayload {
    tabKey: string;
    subTabKey: string;
    name: string;
    url: string;
    uploadDate: string;
    file:File;
}
interface FileRemovePayload {
    tabKey: string;
    subTabKey: string;
    name: string;
}


interface MarkFormCompletedPayload {
    tabKey: string;
    subTabKey: string;
}

export interface DocumentType {
    name:string;
    url:string;
    uploadDate:string;
    file:File;
}

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
            const { tabKey, subTabKey, fieldName, value } = action.payload;
            state.tabs[tabKey].subTabs[subTabKey].fields[fieldName] = value;
            // console.log(`the field ${fieldName} is updated to ${value}`)
        },
        addDocument: (state, action: PayloadAction<FileUploadPayload>) => {
            const { tabKey, subTabKey, name, url, uploadDate,file } = action.payload;
            const document:DocumentType = {
                name, url, uploadDate,file
            }
            state.tabs[tabKey].subTabs[subTabKey].fields.uploadedDocuments.push(document);
            // console.log(`Document ${name} uploaded on ${uploadDate}`);
        },
        removeDocument: (state, action: PayloadAction<FileRemovePayload>) => {
            const { tabKey, subTabKey, name } = action.payload;
            state.tabs[tabKey].subTabs[subTabKey].fields.uploadedDocuments = state.tabs[tabKey].subTabs[subTabKey].fields.uploadedDocuments.filter(
                (doc:DocumentType) => doc.name !== name
            );
            // console.log(`Document ${action.payload} removed`);
        },
        markFormCompleted: (state, action: PayloadAction<MarkFormCompletedPayload>) => {
            const { tabKey, subTabKey } = action.payload;
          
            // Mark the specific sub-tab as completed
            state.tabs[tabKey].subTabs[subTabKey].isFormCompleted = true;
          
            // Check if all sub-tabs in the tab are completed
            const allSubTabsCompleted = Object.values(state.tabs[tabKey].subTabs).every(
              (subTab) => subTab.isFormCompleted
            );
          
            // Update tab status based on sub-tab completion
            if (allSubTabsCompleted) {
              state.tabs[tabKey].status = "Completed";
              state.tabs[tabKey].isTabCompleted = true;
            } else {
              state.tabs[tabKey].status = "In Progress";
              state.tabs[tabKey].isTabCompleted = false;
            }
          
            // Update application submission status
            const allTabsCompleted = Object.values(state.tabs).every(
              (tab) => tab.isTabCompleted
            );
            state.isApplicationSubmitted = allTabsCompleted;
          },
          
        markApplicationSubmitted: (state) => {
            state.isApplicationSubmitted = true;
        },
    },
});

export const { updateField, markFormCompleted, markApplicationSubmitted ,addDocument,removeDocument} = applicationSlice.actions;
export default applicationSlice.reducer;