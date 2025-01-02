import Head from "next/head";
import Image from "next/image";

const Signup = () => {
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
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
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
}

export default Signup;