"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageSearchBox from "@/components/PageSearchBox";
import Breadcrumb from "@/components/Navigation";
import NavigationBar from "@/components/NavigationBar";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams?.get("amount");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div className="lg:flex-row lg:ml-52">
      <Sidebar showSidebar={isSidebarOpen} setShowSidebar={setIsSidebarOpen} />
      <NavigationBar showSidebar={isSidebarOpen} setShowSidebar={setIsSidebarOpen} />
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
  );
}