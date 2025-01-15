'use client';

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Sidebar from "../../components/Sidebar";
import PageSearchBox from "../../components/PageSearchBox";
import Breadcrumb from "@/components/Navigation";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PaymentPage() {
  const amount = 49.99;
  const courseName = "React Development Course"; // Example course name

  function convertToSubcurrency(amount: number): number | undefined {
    // Stripe expects the amount to be in the smallest currency unit (e.g., cents for USD)
    return Math.round(amount * 100);
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex-1 ">
            <Breadcrumb paths={[{ name: "Home", link: "/" }, { name: "Course Payment" }]} />
            <h1 className="text-2xl font-bold">Course Payment</h1>
          </div>
          <div className="flex-1 justify-center">
            <PageSearchBox />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Course Details */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Course: {courseName}</h2>
            <p className="text-lg text-gray-700">Price: ${amount}</p>
          </div>

          {/* Payment Section */}
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount),
              currency: "usd",
            }}
          >
            <CheckoutPage amount={amount} />
          </Elements>
        </div>
      </div>
    </div>
  );
}