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

export default {
  checkUserExistence, registerUser, loginUser, getUserByIdService, updateSubscription
};
