import jwt from "jsonwebtoken";

import { User } from "../../common/models/index.js";
import { ApiError } from "../../common/utils/index.js";
import { getAvatarName } from "../../common/utils/index.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // attach refresh token to user document to avoid refreshing access token with multiple refresh tokens
    user.refreshToken = refreshToken;

    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the access token"
    );
  }
};

const registerUser = async (username, name, email, password) => {
  let user = await User.findOne({ email });
  if (user) throw new ApiError(409, "User with email already exists");

  const profilePicture = `https://ui-avatars.com/api/?name=${getAvatarName(name)}&size=250&background=4d2be2&color=ffffff`;

  user = await User.create({
    username,
    name,
    email,
    password,
    profilePicture,
    signInType: "Email-Password",
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -__v"
  );

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  return { user: createdUser, accessToken, refreshToken };
};

const signInUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "Email and Password do not match");

  if (user.signInType !== "Email-Password") {
    throw new ApiError(
      400,
      `You have already registered using ${user.signInType}. Please use ${user.signInType} as the signin option.`
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Email and Password do not match");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const signedInUser = await User.findById(user._id).select(
    "-password -refreshToken -__v"
  );

  return { user: signedInUser, accessToken, refreshToken };
};

const signOutUser = (id) => {
  return User.findByIdAndUpdate(
    id,
    {
      $set: {
        refreshToken: "",
      },
    },
    { new: true }
  );
};

const getAuthStatus = (accessToken) => {
  if (!accessToken) return false;

  try {
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    return true;
  } catch (error) {
    console.log(error?.message);

    return false;
  }
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (refreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return { accessToken, newRefreshToken };
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
};

const handleSocialSignIn = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User does not exists");

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(userId);

  return { accessToken, refreshToken };
};

export const authService = {
  register: registerUser,
  signIn: signInUser,
  signOut: signOutUser,
  authStatus: getAuthStatus,
  refreshToken: refreshAccessToken,
  socialSignin: handleSocialSignIn,
};
