import React, { createContext, useContext, useState } from 'react';

// Create the context
const SessionContext = createContext(null);

// Create a custom hook for convenience
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  // Initialize session data, e.g., from localStorage or an API
  const [sessionData, setSessionData] = useState(() => {
    const storedSession = localStorage.getItem('session');
    return storedSession ? JSON.parse(storedSession) : null;
  });

  // Function to update session data
  const updateSession = (newData) => {
    setSessionData(newData);
    localStorage.setItem('session', JSON.stringify(newData)); // Persist to localStorage if needed
  };

  // Function to clear session data (e.g., on logout)
  const clearSession = () => {
    setSessionData(null);
    localStorage.removeItem('session');
  };

  return (
    <SessionContext.Provider value={{ sessionData, updateSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};
