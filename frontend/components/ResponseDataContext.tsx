'use client';

import React, { createContext, useState, useContext } from 'react';

interface User {
    userId: number;
    fullName: string;
    email: string;
    updatedAt: string;
    createdAt: string;
    confirmPassword: null;
}

interface ResponseData {
    message: string;
    user: User;
    token: string;
}

// Define an initial context value
const initialContextValue: {
    responseData: ResponseData | null;
    setResponseData: React.Dispatch<React.SetStateAction<ResponseData | null>>;
} = {
    responseData: null,
    setResponseData: () => { } // Dummy function that does nothing
};

// Create the context
const ResponseDataContext = createContext(initialContextValue);

// Custom hook to access the context value
export const useResponseData = () => useContext(ResponseDataContext);

// Context provider component
export const ResponseDataProvider: any = ({ children }: any) => {
    const [responseData, setResponseData] = useState<ResponseData | null>(null);

    return (
        <ResponseDataContext.Provider value={{ responseData, setResponseData }}>
            {children}
        </ResponseDataContext.Provider>
    );
};
