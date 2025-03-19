import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container flex-grow p-4 mx-auto">
        <h1 className="mt-8 text-3xl font-bold text-center">Welcome to Course App</h1>
        <p className="mt-4 text-center text-gray-600">Learn new skills with our courses.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;