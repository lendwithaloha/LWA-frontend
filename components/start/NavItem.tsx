"use client";
import { Divider, Drawer, Box } from "@mui/material";
import { useEffect, useState } from "react";

interface NavItemProps {
  text: string;
  content: {
    title: string;
    sections: {
      [key: string]: {
        title: string;
        description: string;
      }[];
    };
  };
}

export const NavItem = ({ text, content }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detect if the screen is small
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 964); // Consider less than 964px as small screen
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to toggle drawer
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <div
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Nav Item Title */}
      <span
        className={`text-gray-600 cursor-pointer transition-all duration-300 border-b-2 ${
          isHovered ? "]" : "border-transparent"
        }`}
        onClick={isSmallScreen ? toggleDrawer(true) : undefined}
      >
        {text}
      </span>

      {/* Large Screen Dropdown */}
      {!isSmallScreen && isHovered && (
        <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-6 w-max">
            <div className="grid grid-cols-3 gap-8">
              {Object.entries(content.sections).map(
                ([section, items], sectionIndex) => (
                  <div
                    key={section}
                    className={`space-y-4 ${
                      sectionIndex !==
                      Object.entries(content.sections).length - 1
                        ? "border-r-2"
                        : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 pb-2">
                      {section}
                    </h3>
                    <div className="space-y-4 h-full">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="group cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                          <div className="p-3">
                            <h4 className="text-gray-800 font-medium group-hover:text-[#00B8A9] transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Small Screen Drawer */}
      {isSmallScreen && (
        <>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {content.title}
                </h2>
                <Divider />
                <div className="mt-4">
                  {Object.entries(content.sections).map(
                    ([section, items], sectionIndex) => (
                      <div key={sectionIndex} className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 pb-2">
                          {section}
                        </h3>
                        <div className="space-y-4 h-full">
                          {items.map((item, index) => (
                            <div
                              key={index}
                              className="group cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            >
                              <div className="p-3">
                                <h4 className="text-gray-800 font-medium group-hover:text-[#00B8A9] transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Box>
          </Drawer>
        </>
      )}
    </div>
  );
};
