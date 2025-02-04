import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the ActivityLog interface
export interface ActivityLog {
    id: number;
    dateTime: string;
    activity: string;
    role: string;
    action: string;
}

interface ActivityState {
    activityLogs: ActivityLog[];
    searchTerm: string;
    filters: {
        role: string;
        date: string;
        user: string;
    };
}

// Initial state with static data
const initialState: ActivityState = {
    activityLogs: [
        { id: 1, dateTime: "2024-10-02 10:30", activity: "Karen Serra", role: "Loan Processor", action: "Logged In" },
        { id: 2, dateTime: "2024-10-02 10:30", activity: "Jerika Ito", role: "Loan Processor", action: "Changed loan amount" },
        { id: 3, dateTime: "2024-10-02 10:30", activity: "Miguel Vazquez", role: "Loan Officer", action: "Requested document" },
        { id: 4, dateTime: "2024-10-02 10:30", activity: "Brian Fung", role: "Admin", action: "Updated Borrower Data" },
    ],
    searchTerm: "", 
    filters: {
        role: "", // Default role filter
        date: "", // Default date filter
        user: "", // Default user filter
    },
};

// Define the slice
const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload; // Update the search term
        },
        setRoleFilter: (state, action: PayloadAction<string>) => {
            state.filters.role = action.payload; // Update role filter
        },
        setDateFilter: (state, action: PayloadAction<string>) => {
            state.filters.date = action.payload; // Update date filter
        },
        setUserFilter: (state, action: PayloadAction<string>) => {
            state.filters.user = action.payload; // Update user filter
        },
    },
});

export const selectFilteredActivityLogs = (state: { activity: ActivityState }) => {
    const { activityLogs, searchTerm, filters } = state.activity;
    const { role, date, user } = filters;

    return activityLogs.filter(log => {
        // Apply search term filter
        const matchesSearchTerm =
            !searchTerm.trim() ||
            log.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action.toLowerCase().includes(searchTerm.toLowerCase());

        // Apply role filter
        const matchesRole = !role || log.role.toLowerCase() === role.toLowerCase();

        // Apply date filter
        const matchesDate = !date || log.dateTime.startsWith(date);

        // Apply user filter
        const matchesUser = !user || log.activity.toLowerCase().includes(user.toLowerCase());

        // Return true if all filters match
        return matchesSearchTerm && matchesRole && matchesDate && matchesUser;
    });
};

// Export actions and reducer
export const { setSearchTerm, setRoleFilter, setDateFilter, setUserFilter } = activitySlice.actions;
export default activitySlice.reducer;
