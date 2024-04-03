import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (_req, res, next) => {
    try {
        let users = await contactsService.listContacts();

        res.status(200).json({
            message: "Success",
            users: users
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
            user: user
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
            updateUser: updateUser
        });

    } catch (error) {
        next(error);
    }
};


