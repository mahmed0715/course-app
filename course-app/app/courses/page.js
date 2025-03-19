'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CourseCard from '../../components/CourseCard';
import { fetchCourses, addCourse, deleteCourse } from '../../utils/api';
import { useSession } from 'next-auth/react';
const Courses = () => {
  const { data: session } = useSession();

  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', price: 0, description: '', instructor: '' });
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [modalError, setModalError] = useState('');
  const coursesPerPage = 6;

  // Check if the user is an admin
  const isAdmin = session?.user?.role === 'ADMIN';
  const isStudent = session?.user?.role === 'STUDENT';
  const isInstructor = session?.user?.role === 'INSTRUCTOR';
  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  // Filter courses based on search query and price range
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMinPrice = minPrice ? course.price >= parseFloat(minPrice) : true;
    const matchesMaxPrice = maxPrice ? course.price <= parseFloat(maxPrice) : true;
    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBuyCourse = (courseId) => {
    alert(`Buying course with ID: ${courseId}`);
  };

  const handleAddCourse = async () => {
    setIsAddingCourse(true);
    setModalError('');
    try {
      await addCourse(newCourse);
      const updatedCourses = await fetchCourses();
      setCourses(updatedCourses);
      setShowModal(false);
      setNewCourse({ title: '', price: 0, description: '', instructor: '' });
    } catch (err) {
      setModalError('Failed to add course. Please try again later.');
    } finally {
      setIsAddingCourse(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        const updatedCourses = await fetchCourses();
        setCourses(updatedCourses);
      } catch (err) {
        setError('Failed to delete course. Please try again later.');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container flex-grow p-4 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Courses</h1>

        {/* Search and Filter Section */}
        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
          </div>
        </div>

        {/* Add Course Button */}
        {isAdmin || isInstructor && (
          <div className="mb-6">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add Course
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onBuyCourse={handleBuyCourse}
              onDeleteCourse={isAdmin ? handleDeleteCourse : null} // Pass delete function only for admins
              isAdmin={isAdmin} // Pass isAdmin flag
              isStudent={isStudent}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Modal for Adding Course */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
            onClick={() => setShowModal(false)}
          >
            <div
              className="p-6 bg-white rounded-lg shadow-lg w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Add New Course</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              {modalError && (
                <p className="mb-4 text-sm text-red-500">{modalError}</p>
              )}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Course Title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Course Description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Instructor Name"
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newCourse.title || !newCourse.description || !newCourse.instructor || newCourse.price <= 0) {
                      setModalError('Please fill in all fields and ensure the price is greater than 0.');
                    } else {
                      handleAddCourse();
                    }
                  }}
                  disabled={isAddingCourse}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {isAddingCourse ? 'Adding...' : 'Add Course'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Courses;