import { lineItems } from "@/app/dashboard/loan/[id]/application/rehab-info/scope-of-work-details/lineItemsData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    isFormCompleted:boolean;
    isApplicationSubmitted:boolean;
}

const initialLineItems = lineItems as LineItem[]

const calculateSummary = (lineItems: LineItem[]) => {
    const subtotal = lineItems.reduce((acc, item) => acc + item.budget, 0);
    const contingency = subtotal * 0.05; // 5% contingency
    const totalCost = subtotal + contingency;
    return { subtotal, contingency, totalCost };
};;

const initialState: LineItemsState = {
    lineItems: initialLineItems,
    ...calculateSummary(initialLineItems),
    isFormCompleted:false,
    isApplicationSubmitted:false

};

const lineItemsSlice = createSlice({
    name: "lineItems",
    initialState,
    reducers: {
        updateLineItem: (
            state,
            action: PayloadAction<{ index: number; field: string; value: string | number }>
        ) => {
            const { index, field, value } = action.payload;
            const updatedLineItems = [...state.lineItems];
            (updatedLineItems[index] as any)[field] = value;
            state.lineItems = updatedLineItems;
            const summary = calculateSummary(updatedLineItems);
            state.subtotal = summary.subtotal;
            state.contingency = summary.contingency;
            state.totalCost = summary.totalCost;
        },
        updateLineItemById: (
            state,
            action: PayloadAction<{ id: number; field: keyof LineItem; value: string | number }>
        ) => {
            const { id, field, value } = action.payload;
            const itemIndex = state.lineItems.findIndex((item) => item.id === id);
            if (itemIndex !== -1) {
                state.lineItems[itemIndex] = {
                    ...state.lineItems[itemIndex],
                    [field]: value,
                };
                const summary = calculateSummary(state.lineItems);
                state.subtotal = summary.subtotal;
                state.contingency = summary.contingency;
                state.totalCost = summary.totalCost;
            }
        

            
            console.log("lineItem updated")
        },

        setLineItems: (state, action: PayloadAction<LineItem[]>) => {
            state.lineItems = action.payload;
            const summary = calculateSummary(action.payload);
            state.subtotal = summary.subtotal;
            state.contingency = summary.contingency;
            state.totalCost = summary.totalCost;
        },
        markFormCompleted: (state: LineItemsState) => {
            console.log('Scope of Work Details as completed');
            state.isFormCompleted = true;
          },
    },
});

export const { updateLineItemById, setLineItems,markFormCompleted } = lineItemsSlice.actions;
export default lineItemsSlice.reducer;
