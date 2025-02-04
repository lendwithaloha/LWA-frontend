import React from "react";
import Link from 'next/link';

function App() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* Sign In Section */}
          <div className="w-3/5 p-5">
            <p>Sign in Section</p>
            <form>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="border p-2 my-2"
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="border p-2 my-2"
              />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                Sign In
              </button>
            </form>
            <p className="mt-4">
             <Link href="/forgot-password">
                  <a className="text-blue-500">Forgot Password?</a>
            </Link>
            </p>
          </div>

          {/* Sign Up Section */}
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Fill up personal information and start your journey with us.</p>
            <a
              href="#"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
            >
              Sign Up
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
