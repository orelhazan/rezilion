import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {saveContact, deleteAllContacts, deleteContact} from "../actions/actions";
import {Button, Table} from "react-bootstrap";
import '../style/contact-list.css';

class ContactList extends Component {
    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.turnToEditable = this.turnToEditable.bind(this);
        this.state = {
            contacts: props.contacts
        };
    }

    componentWillReceiveProps(props){
        this.setState({
            contacts: props.contacts
        });
    }

    render() {
        return (
            <div className="main-div">
                <div className="contact-list">
                    <Table className="table table-hover">
                        <thead>
                        <tr>
                            <th className="th-name">Name</th>
                            <th className="th-address">Address</th>
                            <th className="th-phone">Phone</th>
                            <th className="th-buttons"> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.contacts.map(this.renderRow)}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

    renderRow = (contact, index) => {
        return (contact.Editable) ? this.renderEditableRow(contact, index) : this.renderViewRow(contact, index);
    };

    onInputChange(changedContact, event) {
        event.preventDefault();
        this.setState({
            contacts: this.state.contacts.map((contact) => {
                    if (contact.Name === changedContact.Name) {
                        contact.Changed = true;
                        switch (event.target.name) {
                            case "address":
                                contact.Address = event.target.value;
                                break;
                            case "phone":
                                contact.Phone = event.target.value;
                                break;
                            case "name":
                                if (!contact.oldName)
                                    contact.oldName = contact.Name;
                                contact.Name = event.target.value;
                                break;
                            default:
                        }
                    }
                    return contact;
                }
            )
        });
    }

    static validate(contact) {
        return (contact.Name && contact.Address && contact.Phone);
    }

    renderViewRow(contact, index) {
        return (
            <tr className="tr-data" key={index}>
                <td><label onClick={() => {
                    this.turnToEditable(contact);
                }}>{contact.Name}</label></td>
                <td>
                    <label onClick={() => {
                        this.turnToEditable(contact);
                    }}>{contact.Address}</label>
                </td>
                <td>
                    <label onClick={() => {
                        this.turnToEditable(contact);
                    }}>{contact.Phone}</label>
                </td>
                <td></td>
            </tr>
        );

    }

    renderEditableRow(contact, index) {
        let isValid = ContactList.validate(contact);
        let isThereChanges = ContactList.isThereChanges(contact);

        return (
            <tr className="tr-data" key={index}>
                <td>
                    <input name="name" type="text" value={contact.Name}
                           placeholder="Enter name"
                           onChange={(e) => {
                               this.onInputChange(contact, e)
                           }}
                           required/>
                </td>
                <td>
                    <input name="address" type="text"
                           placeholder="Enter address"
                           value={contact.Address}
                           onChange={(e) => {
                               this.onInputChange(contact, e)
                           }}/>
                </td>
                <td>
                    <input name="phone" type="number"
                           placeholder="Enter phone number"
                           value={contact.Phone}
                           onChange={(e) => {
                               this.onInputChange(contact, e)
                           }}/>
                </td>
                <td>
                    <div className="td-button">
                        <Button className="button-add" bsStyle="primary" disabled={!isThereChanges || !isValid}
                                onClick={() => {
                                    contact.Editable = false;
                                    this.props.saveContact(contact);
                                }}>
                            Save
                        </Button>

                        <Button bsStyle="danger" onClick={() => {
                            this.props.deleteContact(contact)
                        }}>
                            Delete
                        </Button>
                    </div>
                </td>
            </tr>
        );
    }

    static isThereChanges(contact) {
        let contactInStorage = !JSON.parse(localStorage.getItem(contact.Name));
        return !contactInStorage ||
            contactInStorage.Name !== contact.Name ||
            contactInStorage.Address !== contact.Address ||
            contactInStorage.Phone !== contact.Phone;
    }

    turnToEditable(contactToEdit) {
        this.setState({contacts: this.state.contacts.map((contact) => {
            contact.Editable = (contact.Name === contactToEdit.Name || contact.Name === "");
            return contact;
        })});
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.contacts.contacts
    };
}

function mapDispatcherToProps(dispatch
) {
    return bindActionCreators({
        deleteContact: deleteContact,
        saveContact: saveContact, deleteAllContacts: deleteAllContacts
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatcherToProps)(ContactList);


