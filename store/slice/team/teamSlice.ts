import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { teamAgent as Team } from '@/types/agent-team/team';

interface TeamsState {
    teams: Team[];
    closingAgent: Team | null;
    insuranceAgent: Team | null;
    myInsuranceAgent: Team | null;
    myClosingAgent: Team | null;
}

const initialState: TeamsState = {
    teams: [
        {
            id: "1",
            firstName: "chala",
            lastName: "doe",
            companyName: "Tech Solutions Ltd.",
            phoneNumber: "+1 (555) 123-4567",
            email: "johndoe@example.com",
            contactType: "Attorney",
        },
        {
            id: "2",
            firstName: "chala",
            lastName: "doe",
            companyName: "Innovate Corp.",
            phoneNumber: "+1 (555) 987-6543",
            email: "janesmith@example.com",
            contactType: "Attorney",
        },
        {
            id: "3",
            firstName: "chala",
            lastName: "doe",
            companyName: "Future Enterprises",
            phoneNumber: "+1 (555) 456-7890",
            email: "mikejohnson@example.com",
            contactType: "Partner",
        },
    ],
    closingAgent: {
        id: "1",
        firstName: "Closing",
        lastName: "Agent",
        phoneNumber: "+1 (555) 654-7890",
        email: "closingagent@example.com",
        companyName: "CloseIt Inc.",
    },
    insuranceAgent: {
        id: "2",
        firstName: "Insurance",
        lastName: "Agent",
        phoneNumber: "+1 (555) 987-1234",
        email: "insuranceagent@example.com",
        companyName: "ProtectPlus Ltd.",
    },
    myInsuranceAgent: {
        id: "1",
        firstName: "fuad",
        lastName: "La",
        phoneNumber: "+1 (555) 987-1234",
        email: "myia@example.com",
        companyName: "myProtectPlus Ltd.",
    },
    myClosingAgent: {
        id: "1",
        firstName: "fua",
        lastName: "kros",
        phoneNumber: "+1 (555) 987-1234",
        email: "myic@example.com",
        companyName: "myProtectPlus Ltd.",
    }
};

const teamSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        addTeam: (state, action: PayloadAction<Omit<Team, 'id'>>) => {
            const newTeam: Team = {
                id: new Date().toISOString(),
                ...action.payload,
            };
            state.teams.push(newTeam);
        },
        removeTeam: (state, action: PayloadAction<string>) => {
            state.teams = state.teams.filter(team => team.id !== action.payload);
        },
        updateTeam: (state, action: PayloadAction<Team>) => {
            const index = state.teams.findIndex(team => team.id === action.payload.id);
            if (index !== -1) {
                state.teams[index] = action.payload;
            }
        },
        updateClosingAgent: (state, action: PayloadAction<Team>) => {
            state.closingAgent = action.payload;
        },
        updateInsuranceAgent: (state, action: PayloadAction<Team>) => {
            state.insuranceAgent = action.payload;
        },

        updateMyClosingAgent: (state, action: PayloadAction<Team>) => {
            state.myClosingAgent = action.payload;
        },
        updateMyInsuranceAgent: (state, action: PayloadAction<Team>) => {
            state.myInsuranceAgent = action.payload;
        },
        resetClosingAgent: (state) => {
            state.closingAgent = initialState.closingAgent;
        },
        resetInsuranceAgent: (state) => {
            state.insuranceAgent = initialState.insuranceAgent;
        },
        resetMyClosingAgent: (state) => {
            state.myClosingAgent = initialState.myClosingAgent
        },
        resetMyInsuranceAgent: (state) => {
            state.myInsuranceAgent = initialState.myInsuranceAgent
        },
    },
});

export const { addTeam, removeTeam, updateTeam, updateClosingAgent, updateInsuranceAgent, resetClosingAgent, resetInsuranceAgent, resetMyClosingAgent, resetMyInsuranceAgent, updateMyClosingAgent, updateMyInsuranceAgent } = teamSlice.actions;
export default teamSlice.reducer;
