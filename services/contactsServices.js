import { Contact } from "../modals/contactModel.js";

const listContacts = (userId, filters, limit, offset) => {
  const query = { owner: userId, ...filters };

  const allcontacts = Contact.find(query).limit(limit).skip(offset);

  return allcontacts;
};

async function getContactById(contactId, userId) {
  const query = { owner: userId, _id: contactId };

  const contact = await Contact.findOne(query);

  return contact;
};

async function removeContact(contactId, userId) {
  const query = { owner: userId, _id: contactId };

  const contacts = await Contact.findOneAndDelete(query);

  return contacts;
};

async function addContact(name, email, phone, userId) {
  const newContact = await Contact.create({ name, email, phone, owner: userId });

  return newContact;
};

async function updateContact(contactId, updatedData, userId) {
  const query = { owner: userId, _id: contactId };

  const updatedContact = await Contact.findOneAndUpdate(query, updatedData, { new: true });
  return updatedContact;
}

async function updateStatusContact(contactId, body, userId) {
  const { favorite } = body;
  const updatedContact = await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, { favorite }, { new: true });

  return updatedContact;
};

export default {
  listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact
};
