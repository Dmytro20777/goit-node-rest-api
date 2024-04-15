import { loginUserSchema, registerUserSchema } from "../schemas/userSchema.js";
import HttpError from "../helpers/HttpError.js";
import { checkToken } from "../services/jwtService.js";
import usersServices from "../services/usersServices.js";
 
export const checkRegisterData = async (req, res, next) => {
  try {
    const { value, error } = registerUserSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Invalid user data...", error);
    }
    
    const userExists = await usersServices.checkUserExistence({ email: value.email });

    if (userExists) {
      throw HttpError(409, "User with this email already exists...");
    }

    req.body = value;
    
    next();
  } catch (error) {
    next(error);
  }
};

export const checkLoginData = (req, res, next) => {
  const { value, error } = loginUserSchema.validate(req.body);

  if (error) throw HttpError(401, "Unauthorized...", error);

  req.body = value;

  next();
};

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(" ")[1];

    const userId = checkToken(token);

    if (!userId) throw HttpError(401, "Unauthorized...");

    const currentUser = await usersServices.getUserByIdService(userId);

    if (!currentUser) throw HttpError(401, "Unauthorized...");

    req.user = currentUser;

    next();

  } catch (error) {
    next(error);
  }
}
