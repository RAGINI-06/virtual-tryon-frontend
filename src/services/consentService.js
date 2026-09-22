
import api from "./api";

export const getConsentStatus = async () => {
  const response = await api.get("/api/consent");
  return response.data;
};

export const giveConsent = async () => {
  const response = await api.post("/api/consent", {
    consentGiven: true,
  });

  return response.data;
};