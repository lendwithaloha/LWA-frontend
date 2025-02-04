'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ImportSchedule } from './ImportSchedule';

const tabs = [
    { id: 0, label: 'Owned', href: '/dashboard/real-estate-schedule/owned' },
    { id: 1, label: 'Sold', href: '/dashboard/real-estate-schedule/sold' },
];

const ScheduleSideBar: React.FC = () => {
    const pathname = usePathname();

    // Determine the active path
    const activePath = pathname;
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);


    return (
        <div className="flex flex-col gap-4">
            <div className=" px-3 w-full border-b-2 border-gray-6 flex flex-row gap-2.5">
                {tabs.map((tab) => (
                    <Link key={tab.id} href={tab.href} passHref legacyBehavior>
                        <a
                            className={`py-4 cursor-pointer px-2 flex justify-center items-center gap-2 hover:bg-gray-200 mr-2 ${activePath === tab.href
                                    ? 'border-b-2  border-[#62626D] '
                                : ''
                                }`}
                        >
                            {tab.label}
                        </a>
                    </Link>
                ))}
            </div>
            <div className=" flex justify-between  md:justify-end md:mr-10 gap-4 p-5 md:p-0">

                <button
                    onClick={handleOpenDialog}
                    className="border border-primaryColor text-black rounded-md w-24 h-8 md:w-44 md:h-11"
                >
                    Import 
                </button>
                <button
                    onClick={handleOpenDialog}
                    className="bg-primaryColor text-white rounded-md w-32 h-8 md:w-44 md:h-11"
                >
                    Add a Property
                </button>
            </div>

            {/* <ContactDialog open={openDialog} onClose={handleCloseDialog} /> */}

            <ImportSchedule open={openDialog} onClose={handleCloseDialog} />

        </div>
    );
};

export default ScheduleSideBar;
