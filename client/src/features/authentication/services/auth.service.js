import { privateClient as authClient } from "@services";

const baseURL = import.meta.env.VITE_API_BE_URL;

const AuthService = {
  signup: (formData) => authClient.post("/auth/signup", formData),

  signin: (formData) => authClient.post("/auth/signin", formData),

  signout: () => authClient.get("/auth/signout"),

  checkAuthStatus: () => authClient.get("/auth/status"),

  googleSignin: () =>
    window.open(
      `${baseURL.endsWith("/") ? baseURL : `${baseURL}/`}auth/google`,
      "_self",
    ),
};

export default AuthService;
