import api from "./api";

// Get current user's profile
export const getProfile = async () => {
  const response = await api.get("/api/profile");
  return response.data;
};

// Update current user's profile
export const updateProfile = async (profileData) => {
  const response = await api.put(
    "/api/profile",
    profileData
  );

  return response.data;
};

// Upload profile photo
export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/api/profile/photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete profile photo
export const deleteProfilePhoto = async () => {
  await api.delete("/api/profile/photo");
};

// Load profile photo
export const loadProfilePhoto = async () => {
  const response = await api.get(
    "/api/profile/photo",
    {
      responseType: "blob",
    }
  );

  return URL.createObjectURL(response.data);
};

// Alias used by Dashboard
export const getProfilePhoto = async () => {
  return loadProfilePhoto();
};