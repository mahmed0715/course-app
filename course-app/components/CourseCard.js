import Link from 'next/link';

const CourseCard = ({ course, onBuyCourse, onDeleteCourse, isAdmin, isStudent }) => {
  return (
    <div className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      <h2 className="mb-2 text-xl font-bold">{course.title}</h2>
      <p className="mb-4 text-gray-700">{course.description}</p>
      <p className="font-bold text-blue-600">${course.price}</p>
      <div className="mt-4 space-y-2">
      {isStudent && (  <button
          onClick={() => onBuyCourse(course.id)}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Buy Course
        </button>)}
        <Link
          href={`/courses/${course.id}/lessons`}
          className="block w-full px-4 py-2 text-center text-white bg-green-500 rounded hover:bg-green-600"
        >
          View Lessons
        </Link>
        {isAdmin && (
          <button
            onClick={() => onDeleteCourse(course.id)}
            className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete Course
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;