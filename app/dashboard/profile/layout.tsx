'use client';

import React, { ReactNode } from 'react';
import ProfileSideBar from '@/components/dashboard/profile/SIdeBarProfile';

const Layout = ({ children }: { children: ReactNode }) => {


    return (
        <div className="w-full py-4 lg:py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Section */}
                    <div className="lg:w-1/4">
                        <ProfileSideBar />
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 min-h-[calc(100vh-2rem)]">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;

