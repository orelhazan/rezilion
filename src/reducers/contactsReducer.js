import {SAVE_CONTACT, DELETE_ALL_CONTACTS, DELETE_CONTACT, ADD_NEW_CONTACT, GET_ALL_CONTACTS} from "../actions/actions";


export default function (state = {}, action) {

    switch (action.type) {
        case DELETE_ALL_CONTACTS:
            deleteAllContacts();
            return {...state, contacts: []};

        case DELETE_CONTACT:
            deleteContact(action.payload.Name);
            return {...state, contacts: getAllContacts()};

        case SAVE_CONTACT:
            saveContact(action.payload);
            return {...state, contacts: getAllContacts()};

        case GET_ALL_CONTACTS:
            return{...state, contacts: getAllContacts()};

        case ADD_NEW_CONTACT:
            addNewContact();
            return {...state, contacts: getAllContacts()};
        default: {
            return {...state, contacts: getAllContacts()};
        }
    }
}

function deleteAllContacts() {
    getAllContacts().map((contact) => {
        localStorage.removeItem(contact.Name);
        return {}
    });
}

function saveContact(contact) {
    if (contact.oldName) {
        localStorage.removeItem(contact.oldName);
        delete contact.oldName;
    }

    localStorage.setItem(contact.Name, JSON.stringify(contact));

}

function deleteContact(name) {
    localStorage.removeItem(name);
}

function addNewContact() {
    let newContact = {
        Name: "", Address: "", Phone: "", Editable: true
    };
    localStorage.setItem(newContact.Name, JSON.stringify(newContact));
}

function getAllContacts() {
    let
        keys = Object.keys(localStorage).sort();

    return keys.map((key) => {
        return JSON.parse(localStorage.getItem(key));
    });
}