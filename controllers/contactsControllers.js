import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { favorite, page = 1, limit = 20 } = req.query;

    const filters = {};
    if (favorite) filters.favorite = favorite;

    const offset = (page - 1) * limit;
    const users = await contactsService.listContacts(userId, filters, limit, offset);
    
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
    const contactId = req.params.id;
    const userId = req.user._id; 

    const contact = await contactsService.getContactById(contactId, userId);

    if (!contact) {
      throw HttpError(404, "Contact not found");
    }

    res.status(200).json({
      message: "Success",
      contact
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const userId = req.user._id;

    const user = await contactsService.removeContact(contactId, userId);

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
    const userId = req.user._id;
    const { name, email, phone } = req.body;

    const newUser = await contactsService.addContact(name, email, phone, userId);

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
    const userId = req.user._id;
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const updateUser = await contactsService.updateContact(id, { name, email, phone }, userId);
        
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
    const userId = req.user._id;
    const { id } = req.params;
    const { favorite } = req.body;

    const updatedContact = await contactsService.updateStatusContact(id, { favorite }, userId);

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
