import { Box, Drawer, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { initializeLayers } from "../slices/layerSlice";
import { initializeFilters } from "../slices/filterSlice";
import GlobeViewer from "./GlobeViewer";
import LayerSidebar from "./LayerSidebar";
import SecurityPanel from "./SecurityPanel";

const drawerWidth = 320;

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(initializeLayers());
    void dispatch(initializeFilters());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgba(18, 18, 18, 0.95)",
            backdropFilter: "blur(10px)"
          }
        }}
      >
        <Toolbar />
        <LayerSidebar />
        <SecurityPanel />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, position: "relative" }}>
        <Toolbar />
        <GlobeViewer />
      </Box>
    </Box>
  );
};

export default App;
