import React, { useState, createContext } from "react";
import { UserInfo } from "../utils/types";

interface UserProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => { },
    user: {
        id: '',
        username: '',
        phone: '',
        address: '',
        customer_id: '',
        role: '',
        push_token: ''

    },
    setUser: (user: UserInfo) => { },
    customer: {}
});

export const UserWrapper = ({ children }: UserProviderProps) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<UserInfo>({
        id: '',
        username: '',
        phone: '',
        address: '',
        customer_id: '',
        role: '',
        push_token: ''
    })
    const [customer, setCustomer] = useState<any>({})


    React.useEffect(() => {

    }, [])

    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, customer }
        }>
            {children}
        </UserContext.Provider>
    );
};

export function useUserContext() {
    return React.useContext(UserContext)
}