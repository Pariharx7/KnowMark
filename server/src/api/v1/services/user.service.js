import { User } from "../../common/models/index.js";
import { ApiError, getAvatarName } from "../../common/utils/index.js";
import { cloudinary } from "../../common/utils/index.js";

const buildUserResponse = (userDoc) => {
  if (!userDoc) return null;
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;

  // Derive `avatar` for frontend compatibility: prefer uploaded profilePicture
  user.avatar = user.profilePicture
    ? user.profilePicture
    : `https://ui-avatars.com/api/?name=${getAvatarName(user.name)}&size=250&background=42be2&color=ffffff`;

  // remove internal fields if present
  delete user.password;
  delete user.refreshToken;
  delete user.__v;
  return user;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-bookmarks");
  return buildUserResponse(user);
};

const updateCurrentUser = async (userId, userData) => {
  const { name, image, oldPassword, newPassword } = userData;

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

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

  if (typeof image === "string" && image.trim().length > 0) {
    // Upload to Cloudinary. `image` can be a data URL or a remote URL.
    const upload = await cloudinary.uploader.upload(image, {
      folder: "knowmark/profile_pictures",
      overwrite: true,
      resource_type: "image",
    });
    user.profilePicture = upload.secure_url;
  }

  if (name) {
    user.name = name;

    // If user does not have an uploaded picture, avatar URL will be derived
    // dynamically when we build the response. No need to store `avatar` in DB.
  }

  await user.save();

  const updated = await User.findById(user._id);
  return buildUserResponse(updated);
};

export const userService = {
  getUser: getUserById,
  updateUser: updateCurrentUser,
};
