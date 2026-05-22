import { User } from "../../common/models/index.js";
import { ApiError, getAvatarName } from "../../common/utils/index.js";

const getUserById = async (userId) => {
  return User.findById(userId).select("-password -refreshToken -__v");
};

const updateCurrentUser = async (userId, userData) => {
  const { name, oldPassword, newPassword } = userData;

  const user = await User.findById(userId);

  if (oldPassword && newPassword) {
    if (user.signInType !== "Email-Password") {
      throw new ApiError(
        400,
        `Changing the password is not applicable for accounts registered with ${user.signInType}`
      );
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;
  }

  if (name) {
    user.name = name;
    if (user.signInType === "Email-Password") {
      user.avatar = `https://ui-avatars.com/api/?name=${getAvatarName(name)}&size=250&background=42be2&color=ffffff`;
    }
  }

  await user.save();

  return User.findById(user._id).select("-password -refreshToken -__v");
};

export const userService = {
  getUser: getUserById,
  updateUser: updateCurrentUser,
};
