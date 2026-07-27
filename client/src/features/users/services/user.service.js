import { privateClient as apiClient } from "@services";

const userService = {
  getCurrentUser: () => apiClient.get("/users/me"),

  updateUser: (formData) => apiClient.patch("/users/me", formData),
};

export default userService;
