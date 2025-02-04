//import api Slices
import { apiSlice } from "@/services/api";
import { authSlice } from "@/store/slice/authSlices/authSlices";

import { configureStore } from "@reduxjs/toolkit";
import sideNavReducer from "@/store/slice/RightSideNav";
import formReducer from "@/store/slice/propertyInformationSlices/propertyInspectionSlice";
import propertyImprovementReducer from "@/store/slice/propertyImprovementSlice";
import dscrReducer from "@/store/slice/dscrSlice";
import leaseAgreementReducer from "@/store/slice/leaseAgreementSlice";
import preliminaryTitleReportReducer from "@/store/slice/preliminaryTitleReportSlice";
import closingAgentInfoReducer from "@/store/slice/closingAgentInfoSlice";
import loanReducer from "@/store/slice/loanSlice";
import loanDetailReducer from "@/store/slice/generalInformationSlices/loanDetailsSlice";
import propertyDetailReducer from "@/store/slice/generalInformationSlices/propertyDetailsSlice";
import realEstateExperienceReducer from "./slice/generalInformationSlices/realEstateExperienceSlice";
import propertyPurchaseReducer from "./slice/generalInformationSlices/purchaseDetailsSlice";
import propertyInspectionReducer from "@/store/slice/propertyInformationSlices/propertyInspectionSlice";
import propertyPhotoReducer from "./slice/propertyInformationSlices/propertyPhotoSlice";
import signedPurchaseContractReducer from "@/store/slice/propertyInformationSlices/signedPurchaseContractSlice";
import projectSummaryReducer from "@/store/slice/rehabInformationSlices/projectSummarySlice";
import lineItemReducer from "./slice/rehabInformationSlices/lineItemSlice";

// third party info reducers
import closingAgentReducer from "./slice/third-party-info-slices/closing-agent-slice";
import uploadPrelimTitleReducer from "./slice/third-party-info-slices/perlim-title-slice";
import uploadClosingProtectionReducer from "./slice/third-party-info-slices/closing-protection-letter-slice";
import uploadWireInstructionReducer from "./slice/third-party-info-slices/wire-instruction-slice";
import uploadHazardInsuranceReducer from "./slice/third-party-info-slices/hazard-insurance-slice";
import hazardInsuranceAgentReducer from "./slice/third-party-info-slices/hazard-insurance-agent-slice";

import grantorPersonalInformationReducer from "./slice/guarantorInformationSlices/guarantorPersonalInformationSlice";
import spousalConsenttReducer from "./slice/guarantorInformationSlices/spousalConsentSlice";
import holdBackProcessReducer from "./slice/agreementsSlices/holdBackProcessSlice";
import valuationDeliveryAcknowledgementReducer from "./slice/agreementsSlices/valuationDeliveryAcknowledgementSlice";
import signedDisclosuresReducer from "./slice/agreementsSlices/signedDisclosuresSlice";
import { onboardingSlice } from "./onboarding/OnboardingSlice";
// import borrower information reducers
import entityInformationReducer from "./slice/borrower-information/entity-info-slice";
import participantReducer from "./slice/borrower-information/entity-participant-info-slice";
import formationDocsReducer from "./slice/borrower-information/current-formation-doc-slice";
import organizationalAgreementReducer from "./slice/borrower-information/organization-agreement-slice";
import borrowingAuthorizationReducer from "./slice/borrower-information/borrowing-authorization-slice";
import transactionHistoryReducer from "./slice/borrower-information/transaction-history-slice";
import voidedCheckReducer from "./slice/borrower-information/voided-check-slice";

// common slices
import lockedAlertReducer from "./slice/common-slices/locked-alert-slice";
import applicationReducer from "./slice/csm/applicationSlice";
// import userReducer from "./slice/csm/userSlice";
import userReducer from "./slice/user/userSlice";
import sidebarReducer from "./dashboard/sidebarSlice";
import applicationsReducer from "./slice/csm/applicationsSlice";
import profileSetupSlice from "./slice/borrower-profile/profileSetupSlice";
import { createInvitationApi } from "@/store/slice/user/createInvitationApi";
import { searchDocumentTypeApi } from "@/store/slice/user/searchDocumentTypeApi";
import {documentApi} from "@/store/slice/user/documentApi"
// loan inquiry
import loanInquiryReducer from "./slice/loan-inquiry/loanSlice";
import { apSlice } from "./slice/application/application-sclice";
// import { apSlice } from "./slice/fileSlices/apSlice";
import teamReducer from "./slice/team/teamSlice";

import profileReducer from "./slice/profile/profile-setup";
import { userApi } from "./slice/user/userApi";
import { borrowerApi } from "./slice/profile-api/profileDetail";
import { documentTypeApi } from "./admin-slice/documet-type-api";
import profileSlice from "./slice/profile/profile-setup";
import { setupListeners } from "@reduxjs/toolkit/query";

import staffReducer from "./slice/staff-management/staffSlice";
import activityReducer from "./slice/staff-activity/activitySlice";
import { borrowerDocumentApi } from "./slice/profile/document/borrower-document-api";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [borrowerApi.reducerPath]: borrowerApi.reducer,
    [documentTypeApi.reducerPath]: documentTypeApi.reducer,
    // [applicationSlice.reducerPath]: applicationSlice.reducer,
    [borrowerDocumentApi.reducerPath]: borrowerDocumentApi.reducer,
    [apSlice.reducerPath]: apSlice.reducer,
    [createInvitationApi.reducerPath]: createInvitationApi.reducer,
    [searchDocumentTypeApi.reducerPath]:searchDocumentTypeApi.reducer,
    [documentApi.reducerPath]:documentApi.reducer,

    profile: profileReducer,
    teams: teamReducer,
    staff: staffReducer,
    user: userReducer,
    profileSetup: profileSetupSlice.reducer,
    activity: activityReducer,

    sideNav: sideNavReducer,
    form: formReducer,
    onboarding: onboardingSlice.reducer,
    propertyImprovement: propertyImprovementReducer,
    dscrCalculator: dscrReducer,
    leaseAgreement: leaseAgreementReducer,
    preliminaryTitleReport: preliminaryTitleReportReducer,
    closingAgentInfo: closingAgentInfoReducer,
    loans: loanReducer,
    loanDetails: loanDetailReducer,
    propertyDetails: propertyDetailReducer,
    realEstateExperience: realEstateExperienceReducer,
    puchaseDetail: propertyPurchaseReducer,
    propertyInspection: propertyInspectionReducer,
    propertyPhoto: propertyPhotoReducer,
    signedPurchaseContract: signedPurchaseContractReducer,
    projectSummary: projectSummaryReducer,
    lineItem: lineItemReducer,
    // common-slices
    lockedAlert: lockedAlertReducer,
    // third party infromation reducers
    closingAgent: closingAgentReducer,
    uploadPrelimTitle: uploadPrelimTitleReducer,
    uploadClosingProtection: uploadClosingProtectionReducer,
    uploadWireInstruction: uploadWireInstructionReducer,
    uploadHazardInsurance: uploadHazardInsuranceReducer,
    hazardInsuranceAgent: hazardInsuranceAgentReducer,

    // borrower infromation reducers
    entityInformation: entityInformationReducer,
    participant: participantReducer,
    formationDocs: formationDocsReducer,
    organizationalAgreement: organizationalAgreementReducer,
    borrowingAuthorization: borrowingAuthorizationReducer,
    transactionHistory: transactionHistoryReducer,
    voidedCheck: voidedCheckReducer,

    grantorPersonalInfo: grantorPersonalInformationReducer,
    spousalConsent: spousalConsenttReducer,
    holdBackProcessSlice: holdBackProcessReducer,
    valuationDeliveryAcknowledgement: valuationDeliveryAcknowledgementReducer,
    signedDisclosures: signedDisclosuresReducer,

    application: applicationReducer,

    sidebar: sidebarReducer,
    applications: applicationsReducer,

    // loan inquiry
    loan: loanInquiryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore serialization checks for the `leaseAgreement` slice and actions related to files
        ignoredActions: [
          "leaseAgreement/setFiles",
          "leaseAgreement/addFile",
          "leaseAgreement/removeFile",
          "leaseAgreement/toggleVacancyStatus",
        ],
        ignoredPaths: ["leaseAgreement.files"], // Ignore the `files` path in the store
      },
    }).concat(
      authSlice.middleware,
      apSlice.middleware,
      userApi.middleware,
      borrowerApi.middleware,
      // applicationSLice.middleware,
      apiSlice.middleware,
      documentTypeApi.middleware,
      borrowerDocumentApi.middleware,
      createInvitationApi.middleware,
      searchDocumentTypeApi.middleware,
      documentApi.middleware,
    ),
});
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
