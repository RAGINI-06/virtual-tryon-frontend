import api from "./api";

export const getTryOnHistory = async () => {
  const response = await api.get("/api/try-on/history");
  return response.data;
};

export const uploadTryOnPhotos = async (personPhoto, garmentPhoto) => {
  const formData = new FormData();

  formData.append("personPhoto", personPhoto);
  formData.append("garmentPhoto", garmentPhoto);

  const response = await api.post(
    "/api/try-on/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteTryOn = async (requestId) => {
  await api.delete(`/api/try-on/${requestId}`);
};