const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const id = String(contactId);
  const contact = await data.find((contact) => contact.id === id);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const id = String(contactId);
  const index = await data.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  const [result] = await data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  await data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

async function updateContact(contactId, name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const data = await listContacts();
  const id = String(contactId);
  const contactIndex = await data.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return null;
  }
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  await data.splice(contactIndex, 1);
  await data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
