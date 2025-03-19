'use client';
import { signIn } from 'next-auth/react';

const SignInPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      alert(result.error);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-96">
        <h1 className="mb-6 text-2xl font-bold">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;