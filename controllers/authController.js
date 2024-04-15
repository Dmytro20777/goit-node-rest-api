import HttpError from "../helpers/HttpError.js";
import usersServices from "../services/usersServices.js";

export const register = async (req, res, next) => {
  try {
    const { newUser, token } = await usersServices.registerUser(req.body);

    res.status(201).json({
      user: newUser,
      token,
    });
  } catch (error) {
    next(error);
  };
};

export const login = async (req, res, next) => {
  try {
    const { user, token } = await usersServices.loginUser(req.body);

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {

    const userId = req.user._id

    const user = await usersServices.getUserByIdService(userId);

    if (!user) {
      throw HttpError(401, 'Unauthorized');
    } 

    user.token = null;
    await user.save();

    res.status(204).send();

  } catch (error) {
    next(error);
  }
}

export const getCurrent = (req, res, next) => {
  try {
    if (!req.user) {
      throw HttpError(401, 'Unauthorized');
    }

    const currentUser = req.user;

    res.status(200).json({
      email: currentUser.email,
      subscription: currentUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    
    await usersServices.updateSubscription(req.user._id, subscription);

    res.status(200).json({
      message: "Subscription updated successfully"
    });
    
  } catch (error) {
    next(error);
  };
}
