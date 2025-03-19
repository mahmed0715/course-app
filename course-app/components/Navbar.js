'use client';
import Link from 'next/link';
import useAuthStore from '../store/authStore';

import { signOut } from 'next-auth/react';
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="p-4 text-white bg-blue-600 shadow-lg">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-xl font-bold">Course App</Link>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 bg-green-500 rounded hover:underline hover:bg-green-600">Dashboard</Link>
              <Link href="/courses" className="px-4 py-2 bg-green-500 rounded hover:underline hover:bg-green-600">Courses</Link>
              <button   onClick={() => signOut()} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Login</Link>
              <Link href="/signup" className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
