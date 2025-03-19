'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load
    if (!session || (requiredRole && session.user.role !== requiredRole)) {
      router.push('/auth/signin'); // Redirect to sign-in page
    }
  }, [session, status, router, requiredRole]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Show a loading state
  }

  return children;
};

export default ProtectedRoute;