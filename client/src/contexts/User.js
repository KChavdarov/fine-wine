import {createContext, useState, useEffect, useContext} from 'react';
import * as userService from '../services/userService';

const initialState = {
    _id: '',
    _createdAt: '',
    _updatedAt: '',
    _isAdmin: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    orders: [],
    favorites: [],
    cart: [],
};

export const UserContext = createContext();


export function UserProvider({children}) {
    const [user, setUser] = useState(initialState);
    useEffect(() => {
        verifyUser();
    }, []);

    async function verifyUser() {
        try {
            const user = await userService.getUser();
            setUser(user || initialState);
        } catch (error) {
            throw (error);
        }
    }

    async function register(data) {
        try {
            const user = await userService.register(data);
            setUser(user);
        } catch (error) {
            throw (error);
        }
    }

    async function login(data) {
        try {
            const user = await userService.login(data);
            setUser(user);
        } catch (error) {
            throw (error);
        }
    }

    async function logout() {
        try {
            userService.logout();
            setUser(initialState);
        } catch (error) {
            throw (error);
        }
    }

    return (
        <UserContext.Provider value={{user, register, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
};