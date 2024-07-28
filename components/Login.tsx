"use client"
import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };
    return (
        <div className="h-screen w-screen bg-gradient-to-b from-[#f9f8ff] to-[#b4a9ff] p-20">
            <div className="flex justify-center">
                <div className="flex flex-col border-[1px] border-[#CECECE] rounded-md p-10 bg-white ">
                    <h1 className="text-center font-sans font-bold text-xl text-black">Welcome to <span className="text-[#4534AC]">Workflo!</span></h1>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4 text-black ">
                            <input
                                type="email"
                                id="email"
                                placeholder='Your email'
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-3 py-2 bg-[#EBEBEB] rounded focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-4 relative text-black">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder='Password'
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-80 px-3 py-2 bg-[#EBEBEB] rounded focus:outline-none focus:border-indigo-500"
                                required
                            />
                            <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12h.01M12 12h.01M9 12h.01M21 12c0-4.418-3.582-8-8-8S5 7.582 5 12s3.582 8 8 8 8-3.582 8-8z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.5c-7.5 0-9 7.5-9 7.5s1.5 7.5 9 7.5 9-7.5 9-7.5-1.5-7.5-9-7.5zm0 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"
                />
              </svg>
            )}
          </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-600"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}