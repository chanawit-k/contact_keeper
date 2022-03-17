import React from 'react';
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';
import Contactfilter from '../contact/Contactfilter';

const Home = () => {
    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <Contactfilter />
                <Contacts />
            </div>
        </div>
    );
};

export default Home;
