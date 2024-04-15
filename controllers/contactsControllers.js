import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { favorite, page = 1, limit = 20 } = req.query;

    const filters = {};
    if (favorite) filters.favorite = favorite;

    const offset = (page - 1) * limit;
    const users = await contactsService.listContacts(filters, limit, offset);
    
    res.status(200).json({
      message: "Success",
      users
    });
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await contactsService.getContactById(userId);

    if (!user) {
      throw HttpError(404, "User not found");
    }

    res.status(200).json({
      message: "Success",
      user
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await contactsService.removeContact(userId);

    if (!user) {
      throw HttpError(404, "User not found")
    }

    res.status(200).json({
      message: "Success"
    })
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {

    const { name, email, phone } = req.body;

    const newUser = await contactsService.addContact(name, email, phone);

    res.status(201).json({
      message: "Contact successfully created",
      newUser
    })
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const updateUser = await contactsService.updateContact(id, { name, email, phone });
        
    if (!updateUser) {
      throw HttpError(404, "User not found")
    }

    res.status(200).json({
      message: "Contact successfully updated",
      updateUser
    });

  } catch (error) {
    next(error);
  }
};

export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const updatedContact = await contactsService.updateStatusContact(id, { favorite });

    if (!updatedContact) {
      throw HttpError(404, "Contact not found");
    }

    res.status(200).json({
      message: "Status successfully updated",
      updatedContact
    });
  } catch (error) {
    next(error);
  }
};
