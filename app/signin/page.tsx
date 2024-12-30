import React from "react";

const LoginPage = () => {
  return (
  <div className="font-sans min-h-screen flex items-center justify-center bg-gray-100">
    <div className="flex min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 my-20">
      {/* Left Section */}
      <div className="w-1/3 flex items-center justify-center p-10">
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-4">
            Very good works are waiting for you
          </h1>
          <p className="text-2xl font-semibold">Login Now!!!</p>
            <div className="mt-10">
            <img
              src="/contact-10.svg"
              alt="Illustration"
              width={1000}
              height={1000}
              className="w-full max-w-lg"
            />
            </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-2/3 bg-white flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl font-bold mb-2">SIGN IN</h2>
        <p className="text-gray-500 mb-6">
          How do I get started lorem ipsum dolor at?
        </p>
        <form className="w-full max-w-sm space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 w-full text-center">
          <p className="text-gray-500">Login with Others</p>
          <button className="mt-3 w-full flex items-center justify-center border py-2 rounded-md hover:bg-gray-100">
            <img
              src="/icon-google0.svg"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>
        </div>
        <p className="mt-6 text-gray-600">
          New user?{" "}
          <a href="/signup" className="text-purple-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
