import HttpError from "../helpers/HttpError.js";
import { generateVerificationToken, sendVerificationEmail } from "../services/emailService.js";
import usersServices from "../services/usersServices.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await usersServices.checkUserExistence({ email });
    if (userExists) {
      throw HttpError(409, "User with this email already exists...");
    }

    const verificationToken = generateVerificationToken();

    const { newUser, token } = await usersServices.registerUser({ email, password, verificationToken });

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      user: newUser,
      token,
    });
  } catch (error) {
    next(error);
  }
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
    req.user.token = null;
    await req.user.save();

    res.status(204).send();

  } catch (error) {
    next(error);
  }
};

export const getCurrent = (req, res, next) => {
  try {
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
};

export const updateAvatarController = async (req, res, next) => {
  try {
    const avatarURL = await usersServices.updateAvatarService(req.user, req.file);

    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const result = await usersServices.verifyEmail(verificationToken);

    if (result.error) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
  } catch (error) {
    next(error);
  }
};

export const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    await usersServices.reVerification(email);

    return res.status(200).json({
      message: "Verification email sent"
    })
  } catch (error) {
    next(error);
  }
}
