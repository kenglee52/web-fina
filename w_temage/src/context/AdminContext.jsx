// src/context/AdminContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // โหลด admin จาก localStorage ตอนเริ่มแอป
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

// custom hook
export const useAdmin = () => useContext(AdminContext);

