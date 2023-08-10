import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
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

    setContacts(prevContacts => [...prevContacts, contact]);
    setFilter('');
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter((contact) => contact.id !== contactId));
  };
  
  const visibleContacts = getVisibleContacts();

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
};

export default App;
