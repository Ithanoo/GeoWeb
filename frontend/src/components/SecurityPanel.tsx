import { Box, Divider, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import { useAppDispatch, useAppSelector } from "../store";
import { selectSecurityState, toggleAuditLogging, updateApiKey } from "../slices/securitySlice";

const SecurityPanel = () => {
  const dispatch = useAppDispatch();
  const securityState = useAppSelector(selectSecurityState);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        <SecurityIcon sx={{ mr: 1 }} /> Sécurité
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TextField
        label="Clé API"
        value={securityState.apiKey}
        onChange={(event) => dispatch(updateApiKey(event.target.value))}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={<Switch checked={securityState.auditLogging} onChange={() => dispatch(toggleAuditLogging())} />}
        label="Journalisation de sécurité"
      />
    </Box>
  );
};

export default SecurityPanel;
