import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface AgentCardProps {
    title?: string;
    handleDeleteOpenDialog: () => void;
    handleOpenEdit: () => void;
    agentData?: {
        firstName: string;
        lastName: string;
        companyName: string;
        email: string;
        phoneNumber: string;
    } | null;
}

const AgentCard: React.FC<AgentCardProps> = ({
    title,
    handleDeleteOpenDialog,
    handleOpenEdit,
    agentData,
}) => {
    return (
        <div className="md:p-6 w-full ">
            <h3 className="text-lg mb-6">
                <span className="mr-2">{title}</span>
            </h3>

            <div className="grid grid-rows-2 p-4 bg-white    rounded-xl gap-6 border md:border-0">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <div className="flex md:hidden gap-4 justify-self-end">
                        <IconButton
                            aria-label="edit"
                            className="bg-background p-2 rounded-full"
                            onClick={handleOpenEdit}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            color="error"
                            aria-label="delete"
                            className="bg-background p-2 rounded-full"
                            onClick={handleDeleteOpenDialog}
                        >
                            <Delete />
                        </IconButton>
                    </div>
                    <div className="col-span-2 grid md:grid-cols-2 gap-4 w-[140%]">
                        <div className="">
                            <p className="font-extrabold md:font-bold"> {agentData ? `${agentData.firstName} ${agentData.lastName}` : "Full Name"}</p>
                            <p className="text-sm">Full Name</p>
                        </div>
                        <div className="">
                            <p className="font-extrabold md:font-bold">{agentData?.companyName || "Company Name"}</p>
                            <p className="text-sm">Company Name</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-4 md:justify-self-end">
                        <IconButton
                            aria-label="edit"
                            className="bg-background p-2 rounded-full"
                            onClick={handleOpenEdit}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            color="error"
                            aria-label="delete"
                            className="bg-background p-2 rounded-full"
                            onClick={handleDeleteOpenDialog}
                        >
                            <Delete />
                        </IconButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 w-[140%]">
                    <div className="">
                        <p className="font-extrabold md:font-bold">{agentData?.email || "Email"}</p>
                        <p className="text-sm">Email</p>
                    </div>
                    <div>
                        <p className=" font-extrabold md:font-bold">{agentData?.phoneNumber || "Phone Number"}</p>
                        <p className="text-sm">Phone Number</p>
                    </div>
                    <div>
                        <p className="font-extrabold md:font-bold"></p>
                        <p className="text-sm"></p>
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default AgentCard;
