'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CourseCard from '../../components/CourseCard';
import { fetchCourses } from '../../utils/api';
import { isAdmin, isInstructor, isStudent } from '../../../utils/roles';
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

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
    // Simulate a purchase (you can integrate a payment gateway here)
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
      </main>
      <Footer />
    </div>
  );
};

export default Courses;