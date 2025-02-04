// staffSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// interfaces.ts
export interface StaffMember {
    id: number;
    name: string;
    email: string;
    role: string;
    phoneNumber: string;
}


interface StaffState {
    staffMembers: StaffMember[];
    searchTerm: string; // Add search term to the state
}

const initialState: StaffState = {
    staffMembers: [
        { id: 1, name: "John Doe", role: "Property Manager", email: "johndoe@example.com", phoneNumber: "123-456-7890" },
        { id: 2, name: "Jane Smith", role: "Real Estate Investor", email: "janesmith@example.com", phoneNumber: "987-654-3210" },
        { id: 3, name: "Mike Johnson", role: "Broker", email: "mikejohnson@example.com", phoneNumber: "555-789-1234" },
    ],
    searchTerm: "", 
};

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        addStaffMember: (state, action: PayloadAction<StaffMember>) => {
            state.staffMembers.push(action.payload);
        },
        deleteStaffMember: (state, action: PayloadAction<number>) => {
            state.staffMembers = state.staffMembers.filter(member => member.id !== action.payload);
        },
        updateStaffMember: (state, action: PayloadAction<StaffMember>) => {
            const index = state.staffMembers.findIndex(member => member.id === action.payload.id);
            if (index !== -1) {
                state.staffMembers[index] = action.payload;
            }
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload; // Update the search term
        },
    },
});

// Selector to get the filtered staff members based on the search term
export const selectFilteredStaffMembers = (state: { staff: StaffState }) => {
    const { staffMembers, searchTerm } = state.staff;
    if (!searchTerm.trim()) {
        return staffMembers; // Return all staff members if no search term is entered
    }
    return staffMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export const { addStaffMember, deleteStaffMember, updateStaffMember, setSearchTerm } = staffSlice.actions;
export default staffSlice.reducer;
