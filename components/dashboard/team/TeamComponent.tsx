import React from 'react'
import AgentCard from './AgentCard'
import DeleteModal from './DeleteModal';
import EditDialog from './EditContact';
import { useState } from 'react';
import ContactDialog from './AddContact';
import { Tooltip } from '@/components/common/ToolTip';
import HelpIcon from '@mui/icons-material/Help';
import { TeamTable } from './TeamTable';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/store/store';
import { resetClosingAgent, resetInsuranceAgent, resetMyClosingAgent, resetMyInsuranceAgent, updateClosingAgent, updateMyClosingAgent, updateMyInsuranceAgent } from '@/store/slice/team/teamSlice';
import { updateInsuranceAgent } from '@/store/slice/team/teamSlice';
import { teamAgent } from '@/types/agent-team/team';
import ToggleSwitch from '@/components/common/ToggleSwitch ';



function TeamComponent() {
    const dispatch = useDispatch()

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [teamType, setTeamType] = useState<string | undefined>();
    const [closingPeferredAgent, setClosingPeferredAgent] = useState(false);
    const [insurancePeferredAgent, setInsurancePeferredAgent] = useState(false);


    const handleToggle = (prefered: string) => {
        if (prefered === "closingPreferredAgent") {
            setClosingPeferredAgent(!closingPeferredAgent);

        }
        else {
            setInsurancePeferredAgent(!insurancePeferredAgent);

        }
    };



    const handleCloseEdit = () => setOpenEditDialog(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenEdit = (type: string, agentData: any) => {
        setTeamType(type);
        setSelectedTeam(agentData);
        setOpenEditDialog(true);
    };

    const handleDeleteOpenDialog = () => {
        setDeleteDialog(true);  // Open the delete modal
    }

    const handleDeleteCloseDialog = () => setDeleteDialog(false);

    const handleConfirmDelete = () => {
        if (teamType === "Closing" && formData.closingAgent === "Use an LWA Partner") {
            dispatch(resetClosingAgent());
        } else if (teamType === "Insurance" && formData.insuranceAgent === "Use an LWA Partner") {
            dispatch(resetInsuranceAgent());
        } else if (teamType === "Closing" && formData.closingAgent !== "Use an LWA Partner") {
            dispatch(resetMyClosingAgent());
        } else if (teamType === "Insurance" && formData.insuranceAgent !== "Use an LWA Partner") {
            dispatch(resetMyInsuranceAgent());
        }

        setDeleteDialog(false);
    }

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedTeam, setSelectedTeam] = useState<any | null>(null);


    const handleUpdateTeam = (updatedTeam: teamAgent) => {
        if (teamType === "Closing" && formData.closingAgent === "Use an LWA Partner") {
            dispatch(updateClosingAgent(updatedTeam));
        } else if (teamType === "Insurance" && formData.insuranceAgent === "Use an LWA Partner") {
            dispatch(updateInsuranceAgent(updatedTeam));
        } else if (teamType === "Closing" && formData.closingAgent !== "Use an LWA Partner") {
            dispatch(updateMyClosingAgent(updatedTeam));
        } else if (teamType === "Insurance" && formData.insuranceAgent !== "Use an LWA Partner") {
            dispatch(updateMyInsuranceAgent(updatedTeam));
        }
    };




    const teamData = useSelector((state: RootState) => state.teams.teams);
    const closingAgent = useSelector((state: RootState) => state.teams.closingAgent);
    const insuranceAgent = useSelector((state: RootState) => state.teams.insuranceAgent);
    const { formData } = useSelector((state: RootState) => state.profile);
    const myClosingAgent = useSelector((state: RootState) => state.teams.myClosingAgent);
    const myInsuranceAgent = useSelector((state: RootState) => state.teams.myInsuranceAgent)



    return (
        <div className='p-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-6'>

                {!closingPeferredAgent && formData.closingAgent === "Use an LWA Partner" && <AgentCard
                    title="Closing Agent"
                    agentData={closingAgent}
                    handleOpenEdit={() => handleOpenEdit('Closing', closingAgent)} // Pass closingAgent data
                    handleDeleteOpenDialog={handleDeleteOpenDialog}
                />}
                {!closingPeferredAgent && formData.closingAgent !== "Use an LWA Partner" && <AgentCard title='My Closing Agent'
                    handleOpenEdit={() => handleOpenEdit('Closing', myClosingAgent)}
                    agentData={myClosingAgent} handleDeleteOpenDialog={handleDeleteOpenDialog}
                />}
                {!insurancePeferredAgent && formData.insuranceAgent === "Use an LWA Partner" && <AgentCard
                    title="Insurance Agent"
                    agentData={insuranceAgent}
                    handleOpenEdit={() => handleOpenEdit('Insurance', insuranceAgent)} // Pass insuranceAgent data
                    handleDeleteOpenDialog={handleDeleteOpenDialog}
                />}
                {!insurancePeferredAgent && formData.insuranceAgent !== "Use an LWA Partner" && <AgentCard
                    title="My Insurance Agent" agentData={myInsuranceAgent}
                    handleOpenEdit={() => handleOpenEdit('Insurance', myInsuranceAgent)}
                    handleDeleteOpenDialog={handleDeleteOpenDialog}
                />}
            </div>
            {/* <div className="p-6 flex items-center space-x-4">
                <label htmlFor="preferredAgent" className="text-gray-700 font-medium">
                    Use Lend with Aloha as preferred closing agent for your loans
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="preferredAgent" name="preferredAgent" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-primaryColor transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
            </div> */}


            <div className='flex flex-col'>
                <ToggleSwitch
                    id="closingPreferredAgent"
                    name="closingPreferredAgent"
                    label="Use Lend with Aloha as preferred closing agent for your loans"
                    checked={closingPeferredAgent}
                    onChange={() => handleToggle("closingPreferredAgent")}
                />

                <ToggleSwitch
                    id="insurancePreferredAgent"
                    name="insurancePreferredAgent"
                    label="Use Lend with Aloha as preferred insurance agent for your loans"
                    checked={insurancePeferredAgent}
                    onChange={() => handleToggle("insurancepreferredAgent")}
                />
            </div>

            {/* <ToggleSwitch
                id="closingPreferredAgent"
                name="closingPreferredAgent"
                label="Use Lend with Aloha as preferred closing agent for your loans"
                checked={closingPeferredAgent}
                onChange={()=>handleToggle("closingPreferredAgent")}
            /> */}

            <div className='p-6 flex md:h-[1px] justify-between items-center'>            <div className='w-[45%] md:h-0.5 bg-[#ccc]'></div><h1>Optional</h1><div className='w-[45%] md:h-[1px] bg-[#ccc]'></div>
            </div>


            <div className="p-6 flex justify-between ">
                <h3 className=" text-lg mb-2"><span className="mr-2">Team Members</span><Tooltip text="You prefered team members,partners, or Advisors to stay connected"> <HelpIcon /></Tooltip></h3>
                <button
                    onClick={handleOpenDialog}
                    className="bg-primaryColor text-white  text-xs px-2 md:px-4 rounded-md md:w-44 md:h-11"
                >
                    Add Agent
                </button>
            </div>

            <TeamTable teamData={teamData} />


            {<EditDialog open={openEditDialog} onClose={handleCloseEdit} teamType={teamType} team={selectedTeam} onUpdate={handleUpdateTeam} />
            }            <DeleteModal
                open={deleteDialog}
                onClose={handleDeleteCloseDialog}
                onConfirm={handleConfirmDelete}
            />

            <ContactDialog open={openDialog} onClose={handleCloseDialog} />




        </div>
    )
}

export default TeamComponent




