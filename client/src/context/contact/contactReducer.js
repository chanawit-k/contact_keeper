import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
} from '../types';

export default (state, action) => {
    console.log(action.Type )
    switch (action.Type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
            };
        default:
            return state;
    }
};
