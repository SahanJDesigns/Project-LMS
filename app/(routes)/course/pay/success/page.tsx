"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageSearchBox from "@/components/PageSearchBox";
import Breadcrumb from "@/components/Navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

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
            <Breadcrumb paths={[{ name: "Home", link: "/" }, { name: "Payment Success" }]} />
            <h1 className="text-2xl font-bold">Payment Success</h1>
          </div>
          <div className="flex-1 justify-center">
            <PageSearchBox />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
            <h2 className="text-2xl">You successfully sent</h2>
            <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
              ${amount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}