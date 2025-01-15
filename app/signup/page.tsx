"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User created successfully");
        setError("");
        // Redirect to sign-in page or another page
        router.push("/signin");
      } else {
        setError(data.error || "An error occurred");
        setSuccess("");
      }
    } catch (error) {
      setError("An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Signup Page</title>
      </Head>
      <main className="max-w-6xl w-full flex shadow-lg">
        <div className="flex w-full">
          {/* Left Section */}
          <div className="bg-white p-10 flex-1 flex flex-col justify-center">
            <h1 className="text-2xl mb-4">SIGN UP</h1>
            <p className="mb-4">How to get started lorem ipsum dolor at?</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                type="submit"
                className="bg-indigo-600 text-white p-2 rounded mt-2"
              >
                Create Account
              </button>
            </form>
            <p className="mt-4">Login with Others</p>
            <button className="bg-white text-gray-800 border border-gray-300 p-2 rounded flex items-center justify-center mt-2">
              <Image
                src="/icon-google0.svg"
                width={20}
                height={20}
                alt="Google Icon"
                className="w-5 mr-2"
                loading="eager"
              />
              Sign up with Google
            </button>
            <p className="mt-4">
              Already have an account? <a href="/signin">Log in</a>
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1 bg-gradient-to-br from-indigo-600 to-indigo-500 text-white flex flex-col justify-center items-center text-center p-10 relative">
            {/* Rectangle 3 */}
            <div className="w-52 h-24 bg-white rounded-lg absolute top-5 left-7"></div>

            {/* Rectangle 5 */}
            <div className="w-24 h-12 bg-white bg-opacity-50 rounded absolute bottom-12 right-7"></div>

            {/* Illustration - SVG Image (banner-1-10.svg) */}
            <Image
              className="w-64 h-auto relative mt-5"
              src="/image.png"
              width={300}
              height={300}
              alt="Banner 1"
              loading="eager"
            />

            {/* Text */}
            <h2 className="text-xl mt-5">
              Very good works are waiting for you Login Now!!!
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;