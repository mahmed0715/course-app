'use client';
import useAuthStore from '../../store/authStore';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container flex-grow p-4 mx-auto">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <p>This is your dashboard.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;