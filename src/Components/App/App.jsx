import React, { Component } from "react";
import { nanoid } from "nanoid";
import toast, { Toaster } from 'react-hot-toast';
import { Header, SecondHeader } from "../Header/Header";
import Contacts from "../Contacts/Contacts";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import { Wrapper } from "./App.styled";
import { GlobalStyle } from "./App.styled";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  onHandleSubmit = (event) => {
    const form = event.target;
    const contactName = event.target.elements.name.value;
    const contactPhone = event.target.elements.number.value;
    const isNameInContacts = this.state.contacts.find(
      (element) => element.name === contactName
    );
    event.preventDefault();

    if (isNameInContacts) {
      const notify = () => toast.error(`${contactName} has been added already`);

      notify()
      form.reset();
      return;
    }

    this.setState((prevState) => {
      return {
        contacts: [
          ...prevState.contacts,
          { id: nanoid(), name: contactName, number: contactPhone },
        ],
      };
    });

    form.reset();
  };

  onSearchInput = (event) => {
    const inputValue = event.target.value;

    this.setState({ filter: inputValue });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );

    return filteredContacts;
  };

  deleteContact = (id) => {
    this.setState((prevState) => {
      const newContacts = prevState.contacts.filter(
        (contact) => contact.id !== id
      );
      return {
        contacts: [...newContacts],
      };
    });
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    const contactId = nanoid();
    const numberId = nanoid();

    return (
      <Wrapper>
        <Header />
        <ContactForm
          contactId={contactId}
          numberId={numberId}
          handleSubmit={this.onHandleSubmit}
        />
        <SecondHeader>Contacts</SecondHeader>
        <Filter onSearchInput={this.onSearchInput} value={this.state.filter} />
        <Contacts
          contacts={this.state.contacts}
          filteredContacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
        <GlobalStyle />
              <Toaster />
      </Wrapper>
    );
  }
}

export default App;
