import * as React from 'react';
import { useState } from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { FormData } from '@/store/slice/profile/profile-setup';
import AgentCard from '../team/AgentCard';
import EditDialog from '../team/EditContact';
import DeleteModal from '../team/DeleteModal';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/store/store';
import { resetMyClosingAgent, resetMyInsuranceAgent, updateMyClosingAgent, updateMyInsuranceAgent } from '@/store/slice/team/teamSlice';
import { teamAgent } from '@/types/agent-team/team';


interface teamPreferenceProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const SetTeamPreference: React.FC<teamPreferenceProps> = ({ formData, handleInputChange }) => {
    const dispatch = useDispatch()

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const myClosingAgent = useSelector((state: RootState) => state.teams.myClosingAgent);
    const myInsuranceAgent = useSelector((state: RootState) => state.teams.myInsuranceAgent)
    const [teamType, setTeamType] = useState<string | undefined>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedTeam, setSelectedTeam] = useState<any | null>(null);



    const handleDeleteOpenDialog = () => {
        setDeleteDialog(true);  // Open the delete modal
    }

    const handleDeleteCloseDialog = () => setDeleteDialog(false);
    const handleCloseEdit = () => setOpenEditDialog(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenEdit = (type: string, agentData: any) => {
        setTeamType(type);
        setSelectedTeam(agentData);
        setOpenEditDialog(true);
    };



    const handleConfirmDelete = () => {
        if (teamType === "Closing") {
            dispatch(resetMyClosingAgent());

        }
        else {
            dispatch(resetMyInsuranceAgent());

        }

        setDeleteDialog(false);
    }


    const handleUpdateTeam = (updatedTeam: teamAgent) => {
        if (teamType === "Closing") {
            console.log(teamType)
            dispatch(updateMyClosingAgent(updatedTeam));

        }
        else {
            dispatch(updateMyInsuranceAgent(updatedTeam));

        }
    };




    return (
        <div className="p-2 pt-0 bg-white">
            <h1 className="px-4  text-2xl">
                Set Your Team Preferences
            </h1>
            <div className="flex flex-col  px-6 ">
                <div className="flex flex-col justify-between ">
                    <Typography variant="h6" gutterBottom>
                        Closing Agent                    </Typography>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <FormControl component="fieldset" className="col-span-2">
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <FormLabel >Do you have a preferred contact for closing services, or would you like to use an LWA Partner?</FormLabel>
                            <RadioGroup
                                row
                                name="closingAgent"
                                value={formData?.closingAgent}
                                onChange={handleInputChange}
                                sx={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <FormControlLabel
                                    value="Use an LWA Partner"
                                    control={<Radio />}
                                    label="Use an LWA Partner"

                                />
                                <FormControlLabel
                                    value="Use My Own Contact"
                                    control={<Radio />}
                                    label="Use My Own Contact"
                                />

                            </RadioGroup>
                        </Box>
                    </FormControl>
                </div>
            </div>
            {formData.closingAgent !== "Use an LWA Partner" && <AgentCard title='My Closing Agent'
                handleOpenEdit={() => handleOpenEdit('Closing', myClosingAgent)}
                agentData={myClosingAgent} handleDeleteOpenDialog={handleDeleteOpenDialog}
            />}

            <div className="flex flex-col  py-4 px-6 ">
                <div className="flex flex-col justify-between ">
                    <Typography variant="h6" gutterBottom>
                        Insurance Agent                </Typography>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <FormControl component="fieldset" className="col-span-2">
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <FormLabel >Do you have a preferred contact for closing services, or would you like to use an LWA Partner?</FormLabel>
                            <RadioGroup
                                row
                                name="insuranceAgent"
                                value={formData.insuranceAgent}
                                onChange={handleInputChange}
                                sx={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <FormControlLabel
                                    value="Use an LWA Partner"
                                    control={<Radio />}
                                    label="Use an LWA Partner"

                                />
                                <FormControlLabel
                                    value="Use My Own Contact"
                                    control={<Radio />}
                                    label="Use My Own Contact"
                                />

                            </RadioGroup>
                        </Box>
                    </FormControl>


                </div>
            </div>
            {formData.insuranceAgent !== "Use an LWA Partner" && <AgentCard
                title="My Insurance Agent" agentData={myInsuranceAgent}
                handleOpenEdit={() => handleOpenEdit('Insurance', myInsuranceAgent)}
                handleDeleteOpenDialog={handleDeleteOpenDialog}
            />}
            <EditDialog open={openEditDialog} onClose={handleCloseEdit} teamType={teamType} team={selectedTeam} onUpdate={handleUpdateTeam}
            />
            <DeleteModal
                open={deleteDialog}
                onClose={handleDeleteCloseDialog}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}
