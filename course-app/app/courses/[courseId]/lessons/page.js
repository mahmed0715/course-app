'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchLessonsByCourseId } from '../../../../utils/api';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';

const LessonsPage = () => {
  const { courseId } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isAdmin = localStorage.getItem('userRole') === 'ADMIN';

  useEffect(() => {
    const getCourse = async () => {
      try {
        const selectedCourse = await fetchLessonsByCourseId(courseId);
        if (selectedCourse) {
          setCourse(selectedCourse);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        setError('Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, [courseId]);

  const handleAddLesson = () => {
    router.push(`/courses/${courseId}/lessons/add`);
  };

  const handleEditLesson = (lessonId) => {
    router.push(`/courses/${courseId}/lessons/${lessonId}/edit`);
  };

  const handleDeleteLesson = (lessonId) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      // Simulate deletion
      const updatedLessons = course.lessons.filter((lesson) => lesson.id !== lessonId);
      setCourse({ ...course, lessons: updatedLessons });
      alert('Lesson deleted successfully');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container flex-grow p-4 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">{course.title} - Lessons</h1>

        {isAdmin && (
          <button
            onClick={handleAddLesson}
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Lesson
          </button>
        )}

        <div className="space-y-4">
          {course?.lessons?.map((lesson) => (
            <div key={lesson.id} className="p-4 bg-white rounded shadow-md">
              <h2 className="text-xl font-bold">{lesson.title}</h2>
              <p className="text-gray-600">{lesson.duration}</p>
              {lesson.videoUrl && (
                <video controls className="w-full mt-4">
                  <source src={lesson.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="mt-2 space-x-2">
                {isAdmin && (
                  <button
                    onClick={() => handleEditLesson(lesson.id)}
                    className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LessonsPage;