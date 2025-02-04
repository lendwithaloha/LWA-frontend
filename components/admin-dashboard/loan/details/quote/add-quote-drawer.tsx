"use client";

import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { TextField, Select, MenuItem, Tabs, Tab,SelectChangeEvent } from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";

interface AddQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isAddQuote: boolean;
}

const AddQuoteDrawer: React.FC<AddQuoteDrawerProps> = ({
  isOpen,
  onClose,
  isAddQuote,
}) => {
  const [activeTab, setActiveTab] = useState<"lender" | "required">("lender");
  const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        className: "w-full max-w-[600px] p-6",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-handwriting">{`${isAddQuote ? "Adding" : "Updating"
            } loan quote`}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoCloseOutline className="w-6 h-6" />
          </button>
        </div>

        <div className="self-start mb-6 ">
          <Tabs
            value={activeTab}
            onChange={(event, newValue) => setActiveTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Lender Details" value="lender" />
            <Tab label="Required Documents" value="required" />
          </Tabs>
        </div>

        <div
          className="flex-1 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {activeTab === "lender" ? (
            <div className="space-y-8">
              <section>
                <div className="flex flex-wrap gap-2">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm">Lender</label>
                    <Select
                      fullWidth
                      displayEmpty
                      value={selectedValue} // Controlled value
                      onChange={handleChange} // Update state on change
                      className="rounded-md bg-white"
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E5E7EB",
                        },
                        "& .MuiSelect-select": {
                          padding: "0.75rem",
                        },
                      }}
                      IconComponent={() => (
                        <IoChevronDownOutline className="w-5 h-5 mr-2" />
                      )}
                    >
                      <MenuItem value="">Choose</MenuItem>
                      <MenuItem value="civic">CIVIC</MenuItem>
                      <MenuItem value="kiavi">Kiavi</MenuItem>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">DSCR Requirement</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                  <div className="space-y-3 w-full">
                    <label className="text-sm">Lender Expense Factor</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      className="rounded-md"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-handwriting mb-6">
                  Loan Terms and structure
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm">Term</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Qualifying LTV</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Quoted Rate</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">IO vs PI</label>
                    <Select
                      fullWidth
                      displayEmpty
                      className="rounded-md bg-white"
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E5E7EB",
                        },
                        "& .MuiSelect-select": {
                          padding: "0.75rem",
                        },
                      }}
                      IconComponent={() => (
                        <IoChevronDownOutline className="w-5 h-5 mr-2" />
                      )}
                    >
                      <MenuItem value="" disabled>
                        Choose
                      </MenuItem>
                      <MenuItem value="io">IO</MenuItem>
                      <MenuItem value="pi">PI</MenuItem>
                    </Select>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-handwriting mb-6">Lender Fees</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm">YSP</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Lender Points</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm">Lender Processing</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-handwriting mb-6">LWA Fees</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm">LWA Processing Fee</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">LWA Points</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-lg font-handwriting mb-6">
                  Special Terms and Considerations
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm">PPP Structure</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Financed IR (mo)</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm">Recourse</label>
                    <TextField
                      fullWidth
                      placeholder="Enter here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "0.75rem",
                        },
                      }}
                    />
                  </div>
                </div>
              </section>
              <div className="flex justify-between mt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm">DSCR Requirement</label>
              <TextField
                fullWidth
                placeholder="Enter here"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E5E7EB",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "0.75rem",
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default AddQuoteDrawer;
