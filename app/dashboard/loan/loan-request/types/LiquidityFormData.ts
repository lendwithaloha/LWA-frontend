export interface LiquidityFormData {
    accounts: { type: string; amount: string }[];
    upcomingEvents: string;
    concerns: string;
    document: File | null;
}