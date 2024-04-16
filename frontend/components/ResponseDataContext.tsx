import React, { createContext, useState, useContext } from 'react';

const ResponseDataContext = createContext(null);

export const useResponseData = () => useContext(ResponseDataContext);

export const ResponseDataProvider = ({ children }: any) => {
    const [responseData, setResponseData] = useState(null);

    return (
        <ResponseDataContext.Provider value={{ responseData, setResponseData }}>
            {children}
        </ResponseDataContext.Provider>
    );
};
