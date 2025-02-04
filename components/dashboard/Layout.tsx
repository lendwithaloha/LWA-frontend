"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/dashboard/sidebarSlice";
import { RootState } from "@/store/store";
import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";
import OnboardingModal from "./OnboardingModal";
import OnboardingTour from "./OnboardingTour";
import { setHasCompletedTour } from "@/store/onboarding/OnboardingSlice";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), { ssr: false });

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <AppContent>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-md z-40 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 overflow-x-hidden scrollbar overflow-y-auto bg-gray-100">
            {children}
          </main>

          {/* Overlay for Sidebar on Mobile */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden "
              onClick={() => dispatch(toggleSidebar())}
            ></div>
          )}
        </div>
      </div>
    </AppContent>
  );
};

const AppContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const hasCompletedTour = useSelector(
    (state: RootState) => state.onboarding.hasCompletedTour
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedHasCompletedTour = localStorage.getItem("hasCompletedTour");
    if (storedHasCompletedTour === null) {
      setShowModal(true);
    } else {
      dispatch(setHasCompletedTour(JSON.parse(storedHasCompletedTour)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("hasCompletedTour", JSON.stringify(hasCompletedTour));
  }, [hasCompletedTour]);

  return (
    <>
      {children}
      {showModal && (
        <OnboardingModal isOpen={true} onClose={() => setShowModal(false)} />
      )}
      <OnboardingTour />
    </>
  );
};
