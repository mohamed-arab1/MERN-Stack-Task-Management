"use client"
import React, { useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

interface LoginData {
  email: string;
  password: string;
}

function Login() {

  const router = useRouter()
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      // Handle successful login, e.g., redirect user
      console.log('Login successful', response.data);
      router.push('/');
    } catch (err) {
      // Handle login error
      setError('Invalid email or password');
      console.log(err)
    }
  };


  return (
    <div className="w-full lg:w-[80%] h-full border rounded-md border-gray-300 bg-[#212121] p-6 flex justify-start md:justify-center items-center">
      <div className="w-full md:w-1/2">
        <div>
          <Link href="/">
            <h2 className="mt-6 text-center text-lg sm:text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
          </Link>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email} 
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password} 
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-0 md:items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[180px">
              <Link href="/registration">
                <h2 className="text-center text-lg underline hover:text-indigo-600">New Account?</h2>
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-9a1 1 0 011-1h2a1 1 0 010 2h-2a1 1 0 01-1-1zm2-3a1 1 0 00-2 0v3a1 1 0 102 0V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login