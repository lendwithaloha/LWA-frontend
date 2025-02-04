"use client";
import React, { useState } from "react";
import { Button, Card, Tab, Tabs } from "@mui/material";
import { Close as CloseIcon, Message } from "@mui/icons-material";

interface Message {
  id: string;
  applicationId: string;
  content: string;
  unread?: number;
}

const ChatModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const ongoingMessages: Message[] = [
    {
      id: "1",
      applicationId: "#JP2234",
      content:
        "Please review the latest quote we received from the LWA team. If everything looks good, we will proc...",
      unread: 2,
    },
    {
      id: "2",
      applicationId: "#JP2234",
      content:
        "Please review the latest quote we received from the LWA team. If everything looks good, we will proc...",
      unread: 1,
    },
  ];

  const closedMessages: Message[] = [
    {
      id: "1",
      applicationId: "#JP2234",
      content: "The application on january 2025.",
      unread: 0,
    },
    {
      id: "2",
      applicationId: "#JP2234",
      content:
        "Please review the latest quote we received from the LWA team. If everything looks good, we will proc...",
      unread: 2,
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-24 max-sm:right-2 max-sm:bottom-0 right-4 w-[400px] shadow-lg animate-in fade-in slide-in-from-bottom-4 ">
          <div className="flex  items-start justify-between border-b p-4">
            <div className="flex flex-col">
              <span className="font-medium">Chat with LWA Team</span>
              <span className="text-sm">
                stay updated on your loan application with LWA team{" "}
              </span>
            </div>
            <Button onClick={() => setIsOpen(false)} className="min-w-0 p-0">
              <CloseIcon className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className="border-b"
          >
            <Tab
              label={
                <span className="flex items-center gap-2 ">
                  Ongoing Loans
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] text-white">
                    {ongoingMessages.length}
                  </span>
                </span>
              }
              className="flex-1 normal-case"
            />
            <Tab
              label={
                <span className="flex items-center gap-2">
                  Closed Applications
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[11px] text-black">
                    {closedMessages.length}
                  </span>
                </span>
              }
              className="flex-1 normal-case"
            />
          </Tabs>

          <div className="max-h-[300px] overflow-y-auto p-2">
            {activeTab === 0 ? (
              <div className="divide-y flex flex-col gap-4">
                {ongoingMessages.map((message) => (
                  <div key={message.id} className="p-4 bg-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="mb-1 flex items-start flex-col justify-between">
                        <span className="text-sm text-zinc-600">
                          Application ID:
                        </span>
                        <span className="text-sm font-medium">
                          {message.applicationId}
                        </span>
                      </div>
                      {message.unread && (
                        <span className="mt-1  rounded-full bg-black px-2 py-0.5 text-[10px] text-white">
                          {`${message.unread} Unread message`}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm text-zinc-600">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y flex flex-col gap-4">
                {closedMessages.map((message) => (
                  <div key={message.id} className="p-4 bg-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="mb-1 flex items-start flex-col justify-between">
                        <span className="text-sm text-zinc-600">
                          Application ID:
                        </span>
                        <span className="text-sm font-medium">
                          {message.applicationId}
                        </span>
                      </div>
                      {message.unread && (
                        <span className="mt-1  rounded-full bg-black px-2 py-0.5 text-[10px] text-white">
                          Unread message
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm text-zinc-600">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-0  right-4 max-sm:right-1 min-w-0 max-sm:m-2 m-10 p-2 rounded-full shadow-lg  bg-black  transition-transform `}
      >
        <Message className="text-[30px] max-sm:text-[23px] text-white" />
      </Button>
    </>
  );
};

export default ChatModal;
