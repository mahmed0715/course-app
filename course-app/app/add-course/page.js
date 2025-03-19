'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addCourse } from '../../utils/api';
import ProtectedRoute from '../../components/ProtectedRoute';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [instructor, setInstructor] = useState(''); // New state for instructor
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send instructor along with other course details
      await addCourse({ title, description, price, instructor });
      router.push('/courses');
    } catch (error) {
      alert('Failed to add course');
    }
  };

  return (
    <ProtectedRoute requiredRole="INSTRUCTOR">
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="mb-6 text-2xl font-bold">Add Course</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Instructor</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)} // Handle instructor input
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">Add Course</button>
        </form>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default AddCourse;
