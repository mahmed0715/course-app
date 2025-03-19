'use client';
import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
      <p className="mt-4 text-gray-700">
        You do not have permission to view this page.
      </p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default UnauthorizedPage;