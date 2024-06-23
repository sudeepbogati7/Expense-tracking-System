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
const initialContextValue: {
    responseData: ResponseData | null;
    setResponseData: React.Dispatch<React.SetStateAction<ResponseData | null>>;
} = {
    responseData: null,
    setResponseData: () => { }
};
const ResponseDataContext = createContext(initialContextValue);
export const useResponseData = () => useContext(ResponseDataContext);

export const ResponseDataProvider: any = ({ children }: any) => {
    const [responseData, setResponseData] = useState<ResponseData | null>(null);

    return (
        <ResponseDataContext.Provider value={{ responseData, setResponseData }}>
            {children}
        </ResponseDataContext.Provider>
    );
};
