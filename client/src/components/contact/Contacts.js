import React, { Fragment, useContext ,useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContact ,loading } = contactContext;

    useEffect(()=>{
        getContact();
    })

    if (contacts !== null && contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }

   

    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null
                    ? filtered.map((contact) => (
                          <CSSTransition
                              key={contact._id}
                              timeout={500}
                              classNames='item'
                          >
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))
                    : contacts.map((contact) => (
                          <CSSTransition
                              key={contact._id}
                              timeout={500}
                              classNames='item'
                          >
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))}
            </TransitionGroup>
        </Fragment>
    );
};
export default Contacts;
