import React, {Component} from 'react';
import ContactList from "../containers/contact-list";
import TopHeader from "../containers/TopHeader";

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopHeader/>
                <ContactList/>
            </div>
        );
    }
}

export default App;
