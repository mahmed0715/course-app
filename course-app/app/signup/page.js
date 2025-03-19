'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../utils/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password });
      console.log('Registration Successfull')
      router.push('/login');
    } catch (error) {
      console.log(error);
      // todo should implement toaster
      alert(error.response.data.message||'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="mb-6 text-2xl font-bold">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;