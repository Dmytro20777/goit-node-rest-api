import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (_req, res) => {
    try {
        let users = await contactsService.listContacts();

        if (typeof users === 'string') {
            users = JSON.parse(users);
        }

        res.status(200).json({
            message: "Success",
            users: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getOneContact = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await contactsService.getContactById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Success",
            user: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
export const deleteContact = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await contactsService.removeContact(userId);

        if (!user) {
            return res.status(404).json({
                message: "User non found"
            });
        }

        res.status(200).json({
                message: "Success"
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const createContact = async (req, res) => {
    try {

        const { error } = createContactSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                message: error.message
            })
        }

        const { name, email, phone } = req.body;

        const newUser = await contactsService.addContact(name, email, phone);

        res.status(201).json({
            message: "Contact successfully created",
            newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
};

export const updateContact = async (req, res) => {
    try {
        const { error } = updateContactSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                message: error.message
            });
        }

        const { id } = req.params;
        const { name, email, phone } = req.body;

        const existingContact = await contactsService.getContactById(id);

        if (!existingContact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        if (
            name === existingContact.name &&
            email === existingContact.email &&
            phone === existingContact.phone
        ) {
            return res.status(400).json({
                message: "Body must have at least one field"
            })
        }

        const updateUser = await contactsService.updateContact(id, { name, email, phone });
        
        if (!updateUser) {
            return res.status(404).json({
                message: "Not found"
            });
        }

        res.status(200).json({
            message: "Contact successfully updated",
            updateUser: updateUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};


