import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5000';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add an interceptor to the axios instance
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if token exists in localStorage (or any other storage you're using)
    const token = localStorage.getItem('authToken');

    // If token exists, add it to the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ====================== User Authentication ======================
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  localStorage.setItem('authToken', response.data.access_token);
  localStorage.setItem('userRole', response.data.user.role);
  return response.data;
};

export const registerUser = async (credentials) => {
  const response = await axiosInstance.post('/users/register', credentials);
  return response.data;
};

// ====================== Courses CRUD ======================
export const fetchCourses = async () => {
  const response = await axiosInstance.get('/courses');
  return response.data;
};

export const fetchCourseById = async (courseId) => {
  const response = await axiosInstance.get(`/courses/${courseId}`);
  return response.data;
};

export const addCourse = async (course) => {
  const response = await axiosInstance.post('/courses', course);
  return response.data;
};

export const updateCourse = async (courseId, courseData) => {
  const response = await axiosInstance.put(`/courses/${courseId}`, courseData);
  return response.data;
};

export const deleteCourse = async (courseId) => {
  const response = await axiosInstance.delete(`/courses/${courseId}`);
  return response.data;
};

// ====================== Lessons CRUD ======================
export const fetchLessonsByCourseId = async (courseId) => {
  const response = await axiosInstance.get(`/courses/${courseId}`);
  return response.data;
};

export const fetchLessonById = async (courseId, lessonId) => {
  const response = await axiosInstance.get(`/courses/${courseId}/lessons/${lessonId}`);
  return response.data;
};

export const addLesson = async (courseId, lessonData) => {
  const response = await axiosInstance.post(`/lessons`, { courseId, ...lessonData });
  return response.data;
};

export const updateLesson = async (courseId, lessonId, lessonData) => {
  const response = await axiosInstance.put(`/courses/${courseId}/lessons/${lessonId}`, lessonData);
  return response.data;
};

export const deleteLesson = async (courseId, lessonId) => {
  const response = await axiosInstance.delete(`/courses/${courseId}/lessons/${lessonId}`);
  return response.data;
};