'use client';

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Sidebar from "@/components/Sidebar";
import PageSearchBox from "@/components/PageSearchBox";
import Breadcrumb from "@/components/Navigation";
import CheckoutPage from "./CheckoutPage";
import NavigationBar from "@/components/NavigationBar";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PaymentPage() {
  const amount = 49.99;
  const courseName = "React Development Course"; // Example course name

  function convertToSubcurrency(amount: number): number | undefined {
    // Stripe expects the amount to be in the smallest currency unit (e.g., cents for USD)
    return Math.round(amount * 100);
  }

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="lg:ml-52" >

        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <NavigationBar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>

        <div className="bg-white p-6 m-3 rounded-lg shadow-md">
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
  );
}