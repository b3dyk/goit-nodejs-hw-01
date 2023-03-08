const fsPromises = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fsPromises.readFile(contactsPath, "utf-8");

    console.table(JSON.parse(contacts));
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fsPromises.readFile(contactsPath, "utf-8");

    const contact = JSON.parse(contacts).find(
      (contact) => contact.id === contactId.toString()
    );

    console.log(contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fsPromises.readFile(contactsPath, "utf-8");

    const filteredContacts = JSON.parse(contacts).filter(
      (contact) => contact.id !== contactId.toString()
    );

    await fsPromises.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts),
      "utf-8"
    );

    console.log(`Contact with id:${contactId} successfully deleted`);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: uuidv4(), name, email, phone };

    const contacts = await fsPromises.readFile(contactsPath, "utf-8");

    const newList = [...JSON.parse(contacts), newContact];

    await fsPromises.writeFile(contactsPath, JSON.stringify(newList), "utf-8");

    console.log(`${name} successfully added`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
