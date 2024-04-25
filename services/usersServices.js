import Jimp from "jimp";
import path from "path";
import { v4 } from "uuid";

import HttpError from "../helpers/HttpError.js";
import { User } from "../modals/userModel.js";
import { signToken } from "./jwtService.js";

async function checkUserExistence(filter) {
  if (!filter) {
    throw new Error('Filter is required');
  };

  const existUser = await User.exists(filter);
  return existUser;
};

async function registerUser(userData) {
  const newUser = await User.create({
    ...userData,
    subscription: "starter"
  });

  newUser.password = undefined;

  const token = signToken(newUser.id);

  return {newUser, token};
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) throw HttpError(400, "Bad Request");

  const passwordIsValid = await user.checkUserPassword(password, user.password);

  if (!passwordIsValid) throw HttpError(401, "Email or password is wrong");

  user.token = signToken(user._id); 
  await user.save();
  
  user.password = undefined;
  const token = signToken(user._id);

  return { user, token };
};

async function getUserByIdService(id) {
  const userId = await User.findById(id);

  return userId
};

const updateSubscription = async (userId, subscription) => {

  if (!["starter", "pro", "business"].includes(subscription)) {
    throw new Error("Invalid subscription type");
  }
  await User.findByIdAndUpdate(userId, { subscription });
};

const updateAvatarService = async (user, file) => {
  if (!file) {
    throw new Error("No file uploaded");
  }
  const image = await Jimp.read(file.path);
  await image.resize(250, 250);
  const newFileName = `${v4()}${path.extname(file.originalname)}`;
  const newFilePath = path.join("public", "avatars", newFileName); 

  await image.writeAsync(newFilePath);

  const avatarURL = `/avatars/${newFileName}`;

  user.avatarURL = avatarURL;
  await user.save();

  return avatarURL;
}; 

export default {
  checkUserExistence, registerUser, loginUser, getUserByIdService, updateSubscription, updateAvatarService
}
