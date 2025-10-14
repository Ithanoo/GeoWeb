import axios from "axios";

interface SecuritySettings {
  apiKey: string;
  auditLogging: boolean;
}

export const saveSecuritySettings = async (settings: SecuritySettings) => {
  return axios.post("/api/security/settings", settings);
};
