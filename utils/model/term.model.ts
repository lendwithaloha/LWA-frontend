import { ReactNode } from "react";
import { IconType } from "react-icons";

export type LoanOption = {
    loanToValue: number;
    totalLoan: number;
    rate: number;
    monthlyPayment: number;
    term: number;
    status: number;// term in days
  };
  
  type CashRequiredAtClosing = {
    originationFee: number;
    serviceFee: number;
    proRatedInterest: number;
    thirdPartyFee: string;
  };
  
type AdditionalLoanDetail ={
    label:string,
    value:string

}

  type BrokerCompensation = {
    icon?:IconType
    label:string;
    value:string
  };
  
  type Documents = {
    name: string;
    downloadLink: string;
  };
  
  type RelationshipManager = {
    name: string;
    phone: string;
  };
  type LoanDetail = {
    icon?: IconType;
    label: string;
    value: string;
  };
  

type BrokerCompDetail = {
    icon?: ReactNode;
    label: string;
    value: string | null; 
  };
  
 
 type DocumentDetail = {
    label: string;
    buttonText: string;
  };
  
 export type TermLoanData = {
    loanOptions: LoanOption[];
    loanDetails: LoanDetail[];
    monthlyPaymentAndInterest: number;
    interestRate: number;
    cashRequiredAtClosing: CashRequiredAtClosing;
    brokerCompensation: BrokerCompensation[];
    documents: Documents[];
    relationshipManager: RelationshipManager;
    additionalDetail:AdditionalLoanDetail[];
 
  };
  