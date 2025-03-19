'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../../../components/Navbar'; // Import Navbar
import Footer from '../../../../../components/Footer'; // Import Footer
import { addLesson } from '../../../../../utils/api';

const AddLessonPage = () => {
  const { courseId } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isInstructor, setIsInstructor] = useState(false);

  // Check if the user is an instructor
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'INSTRUCTOR') {
      router.push('/unauthorized'); // Redirect to unauthorized page
    } else {
      setIsInstructor(true);
    }
  }, [router]);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('courseId', courseId);

      const response = await addLesson(courseId, formData);

      router.push(`/courses/${courseId}/lessons`);
    } catch (err) {
      setError('Failed to add lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If not an instructor, show nothing (redirect happens in useEffect)
  if (!isInstructor) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container flex-grow p-4 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Add Lesson</h1>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Content</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Adding...' : 'Add Lesson'}
          </button>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddLessonPage;