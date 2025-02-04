import DeclarationsForm from "@/components/dashboard/profile/Declaration";
import PersonalDetailProfile from "@/components/dashboard/profile/PersonalDetailProfile";
import TeamComponent from "@/components/dashboard/team/TeamComponent";
import { Drawer, Box, Tabs, Tab, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, SyntheticEvent } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`grantor-tabpanel-${index}`}
      aria-labelledby={`grantor-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface GrantorDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function GrantorDrawer({ open, onClose }: GrantorDrawerProps) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "50%",
          boxSizing: "border-box",
        },
      }}
    >
      <div className="flex  justify-between h-16">
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            pt: 2,
            px: 1,
            flex: 1,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="grantor tabs"
            variant="fullWidth"
          >
            <Tab
              label="Personal Details"
              id="grantor-tab-0"
              aria-controls="grantor-tabpanel-0"
            />
            <Tab
              label="Declaration"
              id="grantor-tab-1"
              aria-controls="grantor-tabpanel-1"
            />
            <Tab
              label="Team Preferences"
              id="grantor-tab-2"
              aria-controls="grantor-tabpanel-2"
            />
          </Tabs>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1, px: 1 }}>
          <IconButton onClick={onClose} aria-label="close drawer">
            <CloseIcon />
          </IconButton>
        </Box>
      </div>

      <CustomTabPanel value={tabValue} index={0}>
        <PersonalDetailProfile edit={false} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <DeclarationsForm />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <div>Team Preferences</div>
      </CustomTabPanel>
    </Drawer>
  );
}
