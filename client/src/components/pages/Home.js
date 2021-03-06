import React, { useContext, useEffect } from 'react';
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';
import Contactfilter from '../contact/Contactfilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    
    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

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
