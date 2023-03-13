import { Component } from 'react';
import { nanoid } from 'nanoid';

import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handlerFormSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const ArrayNames = contacts.map(contact => contact.name.toLowerCase());
    const normalizeName = name.toLowerCase();

    if (ArrayNames.includes(normalizeName)) {
      alert(`${name}вже є в книзі`);
      return;
    }
    this.setState(({ contacts }) => {
      return {
        contacts: [{ id: nanoid(), name: name, number: number }, ...contacts],
      };
    });
  };

  componentDidMount() {
    const contactsList = localStorage.getItem('contactsList');
    const parsedContactsList = JSON.parse(contactsList);

    if (contactsList) {
      this.setState({ contacts: parsedContactsList });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contactsList', JSON.stringify(this.state.contacts));
  }

  handlerInputFilter = e => this.setState({ filter: e.currentTarget.value });

  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  clickDeletBtn = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const contactElem = this.getContacts();

    return (
      <>
        <h1>Phonebook</h1>
        <Form onSubmitHendler={this.handlerFormSubmit}></Form>
        <h2>Contacts</h2>
        <Filter
          text="Find contacts by name"
          value={filter}
          onChange={this.handlerInputFilter}
        />
        <ContactList
          contacts={contactElem}
          text="Delete"
          onClick={this.clickDeletBtn}
        />
      </>
    );
  }
}
