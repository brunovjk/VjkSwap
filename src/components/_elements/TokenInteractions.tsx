import React, { useState } from "react";
import Send from "../Send";
import Swap from "../Swap";
import History from "../History";
import { Paper, Tabs, Tab, Typography, Box } from "@mui/material";

const style = {
  paper: {
    padding: { xs: "12px 0px 4px 0px", sm: "12px 24px 4px 24px" },
    borderColor: "primary.light",
  },
  tab: { borderBottom: 1, borderColor: "divider" },
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function TokenInteractions() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper sx={style.paper}>
      <Box sx={style.tab}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="TokenInteractions"
        >
          <Tab label="Send" {...a11yProps(0)} />
          <Tab label="Swap" {...a11yProps(1)} />
          <Tab label="History" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Send />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Swap />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <History />
      </TabPanel>
    </Paper>
  );
}
