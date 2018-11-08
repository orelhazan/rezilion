import React, {Component} from "react";
import {connect} from "react-redux";
import logo from "../style/logo.png";
import '../style/topHeader.css';
import {Button} from "react-bootstrap";
import {deleteAllContacts, addNewContact} from "../actions/actions";
import {bindActionCreators} from "redux";

export class TopHeader extends Component {
    render() {
        return (
            <div className="w3-top top-header">
                <div className="w3-white w3-xlarge" style={{"maxWidth": "1200px", "margin": "auto"}}>
                    <div className="w3-right w3-padding-16">

                        <Button className="button-add" bsStyle="primary" onClick={() => {
                            this.props.addNewContact()
                        }}>Add contact
                        </Button>
                        <Button bsStyle="danger" onClick={() => {
                            this.props.deleteAllContacts()
                        }}>Delete All
                        </Button>
                    </div>
                    <div className="w3-left w3-padding-16">
                        <img className="logo" src={logo} alt="r"/>
                    </div>
                    <div className="w3-center w3-padding-16">
                        <h1>Phone Book</h1>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatcherToProps(dispatch) {
    return bindActionCreators({
        addNewContact: addNewContact, deleteAllContacts: deleteAllContacts
    }, dispatch);
}

export default connect(null, mapDispatcherToProps)(TopHeader);