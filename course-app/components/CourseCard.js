'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { axiosInstance } from '../utils/api';
import Link from 'next/link';
import { motion } from "framer-motion";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ courseId, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create a payment intent for the course
      const { data } = await axiosInstance.post('/payments/create-payment-intent', {
        courseId,
      });

      // Confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        },
      );

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
        onClose(); // Close the payment modal
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

const CourseCard = ({ course, onBuyCourse, onDeleteCourse, isAdmin, isStudent }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleBuyCourse = () => {
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <motion.div
      className="course-card"
      initial={{ opacity: 0, y: 50 }} // initial state
      animate={{ opacity: 1, y: 0 }}  // final state
      transition={{ duration: 0.5 }}   // transition duration
      whileHover={{ scale: 1.05 }}    // hover effect
    >
    <div className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      <h2 className="mb-2 text-xl font-bold">{course.title}</h2>
      <p className="mb-4 text-gray-700">{course.description}</p>
      <p className="font-bold text-blue-600">${(course.price / 100).toFixed(2)}</p>
      <div className="mt-4 space-y-2">
        {isStudent && (
          <button
            onClick={handleBuyCourse}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Buy Course
          </button>
        )}
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

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-md w-96">
            <h2 className="mb-4 text-xl font-bold">Complete Payment</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm courseId={course.id} onClose={handleCloseModal} />
            </Elements>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 mt-4 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    </motion.div>
  );
};

export default CourseCard;