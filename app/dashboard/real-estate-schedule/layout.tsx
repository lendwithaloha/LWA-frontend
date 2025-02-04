
import ScheduleSideBar from "@/components/dashboard/realEstateSchedule/ScheduleSideBar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 ">
            {/* Tabs and Content */}
            <div className="flex flex-col flex-1">
                <ScheduleSideBar />
              

                <main className=" flex-1 ">
                    {/* Render the child content */}
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
