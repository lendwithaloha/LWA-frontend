'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ContactDialog from './AddContact';
import { Tooltip } from '@/components/common/ToolTip';
import HelpIcon from '@mui/icons-material/Help';


const tabs = [
    { id: 0, label: 'Closing Agent', href: '/dashboard/team/closing-agent' },
    { id: 1, label: 'Insurance Agent', href: '/dashboard/team/insurance-agent' },
    { id: 2, label: 'Others', href: '/dashboard/team/others' },
];

const SettingSideBar: React.FC = () => {
    const pathname = usePathname();

    // Determine the active path
    const activePath = pathname;
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-background px-3 w-full border-b-2 border-gray-6 flex flex-row gap-8">
                {tabs.map((tab) => (
                    <Link key={tab.id} href={tab.href} passHref legacyBehavior>
                        <div className='flex  text-center'>
                            <a
                                className={`py-4 cursor-pointer px-2 flex justify-center items-center gap-2 hover:bg-gray-200 mr-2 ${activePath === tab.href
                                    ? 'border-b-2  border-[#62626D] '
                                    : ''
                                    }`}
                                style={{ cursor: 'pointer' }}

                            >
                                {tab.label}
                                <div className=''> {tab.label === "Closing Agent" && <Tooltip text="You prefered closing attorney or escrow officer"> <HelpIcon /></Tooltip>
                                }
                                    {tab.label === "Others" && <Tooltip text="You prefered team members,partners, or Advisors to stay connected"> <HelpIcon /></Tooltip>
                                    }</div>
                            </a>


                        </div>


                    </Link>
                ))}
            </div>
            <div className=" flex justify-end mr-10">
                <button
                    onClick={handleOpenDialog}
                    className="bg-homeSecondary text-white rounded-md w-44 h-11"
                >
                    Add Agent
                </button>
            </div>
            <ContactDialog open={openDialog} onClose={handleCloseDialog} />
        </div>
    );
};

export default SettingSideBar;
