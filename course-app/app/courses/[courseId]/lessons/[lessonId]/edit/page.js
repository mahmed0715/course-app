'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchCourses, fetchLessons } from '../../../../../../utils/api';

const EditLessonPage = () => {
  const { courseId, lessonId } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLesson = async () => {
      const courses = await fetchCourses();
      const course = courses.find((c) => c.id === parseInt(courseId));
      if (course) {
        const lesson = course.lessons.find((l) => l.id === parseInt(lessonId));
        if (lesson) {
          setTitle(lesson.title);
          setDuration(lesson.duration);
        }
      }
      setLoading(false);
    };
    getLesson();
  }, [courseId, lessonId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate updating a lesson
    alert(`Lesson updated: ${title} (${duration})`);
    router.push(`/courses/${courseId}/lessons`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Edit Lesson</h1>
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
          <label className="block mb-2 text-sm font-medium">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Update Lesson
        </button>
      </form>
    </div>
  );
};

export default EditLessonPage;