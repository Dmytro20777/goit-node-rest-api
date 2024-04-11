import { Contact } from "../modals/contactModal.js";

const listContacts = () => Contact.find()

async function getContactById(contactId) {
  const contacts = await Contact.findById(contactId);
  return contacts;
}

async function removeContact(contactId) {
  const contacts = await Contact.findByIdAndDelete(contactId);

  return contacts;
}

async function addContact(name, email, phone) {
  const newContact = await Contact.create({ name, email, phone });

  return newContact;
}

async function updateContact(contactId, updatedData) {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, updatedData, { new: true });

  return updatedContact;
}

async function updateStatusContact(contactId, body) {
  const { favorite } = body;
    
  const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    
  return updatedContact;
}

export default { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };
