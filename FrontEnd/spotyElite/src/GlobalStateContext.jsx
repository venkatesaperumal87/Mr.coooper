import React, { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [submittedRequests, setSubmittedRequests] = useState([]);

  return (
    <GlobalStateContext.Provider value={{ submittedRequests, setSubmittedRequests }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
