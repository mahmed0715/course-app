export const isAdmin = localStorage.getItem('userRole') === 'ADMIN';
export const isInstructor = localStorage.getItem('userRole') === 'INSTRUCTOR';
export const isStudent = localStorage.getItem('userRole') === 'STUDENT';