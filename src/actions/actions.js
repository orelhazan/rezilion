export const SAVE_CONTACT = "SAVE_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const DELETE_ALL_CONTACTS = "DELETE_ALL_CONTACTS";
export const ADD_NEW_CONTACT = "ADD_NEW_CONTACT";
export const GET_ALL_CONTACTS = "GET_ALL_CONTACTS";

export function saveContact(contact) {
    return {
        type: SAVE_CONTACT,
        payload: contact
    };
}

export function deleteContact(contact) {
    return {
        type: DELETE_CONTACT,
        payload: contact
    };
}

export function deleteAllContacts() {
    return {
        type: DELETE_ALL_CONTACTS
    };
}

export function addNewContact () {
    return {
        type: ADD_NEW_CONTACT
    };
}