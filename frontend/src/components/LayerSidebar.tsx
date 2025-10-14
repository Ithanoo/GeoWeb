import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import TerrainIcon from "@mui/icons-material/Terrain";
import { useAppDispatch, useAppSelector } from "../store";
import { selectLayers, toggleLayer } from "../slices/layerSlice";

const LayerSidebar = () => {
  const dispatch = useAppDispatch();
  const layers = useAppSelector(selectLayers);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        <LayersIcon sx={{ mr: 1 }} /> Calques disponibles
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {layers.map((layer) => (
          <ListItem key={layer.id} secondaryAction={
            <Switch
              edge="end"
              onChange={() => dispatch(toggleLayer(layer.id))}
              checked={layer.active}
              inputProps={{ "aria-label": `Activer le calque ${layer.name}` }}
            />
          }>
            <ListItemIcon>
              <TerrainIcon />
            </ListItemIcon>
            <ListItemText primary={layer.name} secondary={layer.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LayerSidebar;
