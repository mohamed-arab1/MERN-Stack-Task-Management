"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'

interface RegistrationData  {
  name: string;
  email: string;
  password: string;
}

function Registration () {
  const router = useRouter()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const registrationData: RegistrationData = { name, email, password };
      const response = await axios.post('http://localhost:3000/auth/signup', registrationData);
      console.log('Registration successful', response.data);
      router.push('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };


  return (
    <div className="w-full xl:w-[80%] h-full border rounded-md border-gray-300 bg-[#212121] p-6 flex justify-center items-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-lg sm:text-3xl font-extrabold text-white">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit} method="POST">
          <input
            type="text"
            id="name"
            name="name"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="First Name"
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            id="email"
            name="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-3"
            placeholder="Email Address"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-3"
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Registration;