'use client'

import { useEffect, useState } from 'react';

export const useUserRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // We are in the client-side environment, so we can access localStorage
      const userRole = localStorage.getItem('userRole');
      setRole(userRole);
    }
  }, []);

  return {
    isAdmin: role === 'ADMIN',
    isInstructor: role === 'INSTRUCTOR',
    isStudent: role === 'STUDENT',
  };
};
