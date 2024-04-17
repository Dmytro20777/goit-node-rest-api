import HttpError from "../helpers/HttpError.js";
import { checkToken } from "../services/jwtService.js";
import usersServices from "../services/usersServices.js";
 
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
