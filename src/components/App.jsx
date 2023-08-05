import React, { Component } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  
  };

  addContact = (name, number) => {
    const { contacts } = this.state;

    const existingContact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      name,
      number,
      id: nanoid()
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };
  
  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={ this.addContact } />
        
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />
        <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
      </div>
    )
  };
};

export default App;