import { Contact } from "../modals/contactModal.js";

async function listContacts() {
    try {
        const contacts = await Contact.find();

        return contacts;

    } catch (error) {
        throw error;
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await Contact.findById(contactId);

        return contacts;

    } catch (error) {
        throw error;
    }
}


async function removeContact(contactId) {
    try {
        const contacts = await Contact.findByIdAndDelete(contactId);

        return contacts;

    } catch (error) {
        throw error;
    }
}


async function addContact(name, email, phone) {
  try {
      const newContact = await Contact.create({ name, email, phone });

      return newContact;

  } catch (error) {
      throw error;
  }
}


async function updateContact(contactId, updatedData) {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(contactId, updatedData, { new: true });

        return updatedContact;

    } catch (error) {
        throw error;
    }
}

export const updateStatusContact = async (contactId, body) => {
    try {
        const { favorite } = body;
        const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

        return updatedContact;
        
    } catch (error) {
        throw error;
    }
};


export default { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };