"use client";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import PageSearchBox from "../../components/PageSearchBox";
import Breadcrumb from "@/components/Navigation";

const CoursePayPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [courseName] = useState("React Development Course"); // Example course name
  const [coursePrice] = useState(99.99); // Example course price

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePayment = () => {
    // Handle payment logic here
    console.log("Payment details:", {
      cardNumber,
      expiryDate,
      cvv,
      firstName,
      lastName,
    });
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
            <p className="text-lg text-gray-700">Price: ${coursePrice}</p>
          </div>

          {/* Payment Details Form */}
          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Payment Details</h2>
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="px-4 py-2 border rounded-lg w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="px-4 py-2 border rounded-lg w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Card Number</label>
                <div className="flex flex-col sm:flex-row items-center">
                  <input
                    type="text"
                    className="px-4 py-2 border rounded-lg w-full sm:flex-1"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <div className="flex mt-2 sm:mt-0 sm:ml-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                      alt="Visa"
                      className="h-8"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      alt="Mastercard"
                      className="h-8 ml-2"
                    />
                    <img
                      src="https://www.pymnts.com/wp-content/uploads/2014/03/Discover-logo-e1416429693676.jpg"
                      alt="Discover"
                      className="h-8 ml-2"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Expiry Date</label>
                  <input
                    type="month"
                    className="px-4 py-2 border rounded-lg w-full"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">CVV</label>
                  <input
                    type="text"
                    className="px-4 py-2 border rounded-lg w-full"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="px-4 py-2 bg-blue-700 text-white rounded-full w-48"
                  onClick={handlePayment}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination or Navigation */}
        <div className="mt-6 flex justify-center items-center space-x-2">
          <button className="px-3 py-1 bg-gray-300 rounded-md">1</button>
          <button className="px-3 py-1 bg-blue-700 text-white rounded-md">2</button>
          <button className="px-3 py-1 bg-gray-300 rounded-md">3</button>
        </div>
      </div>
    </div>
  );
};

export default CoursePayPage;