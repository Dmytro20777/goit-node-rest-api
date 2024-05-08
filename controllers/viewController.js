import { Contact } from "../modals/contactModel.js";

export const home = (req, res) => {
  res.status(200).render('home', {
    title: "Contacts app home page!!!",
    active: "home",
  });
};

export const contacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find();
    res.status(200).render('contacts', {
      title: "Contacts list!!!",
      active: "contacts",
      allContacts,
    });
  } catch (error) {
    next(error)
};
};
