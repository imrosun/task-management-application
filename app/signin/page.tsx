"use client"
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, error } = useAuth();
  const router = useRouter();
  

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard'); 
    } catch (err) {
      console.error('Login failed:', err); 
    }
  };
  
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#f9f8ff] to-[#b4a9ff] p-20">
      <div className="flex justify-center">
        <div className="flex flex-col border-[1px] border-[#CECECE] rounded-lg p-10 bg-[#f5f5f5] ">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center font-sans font-bold text-3xl px-12 mb-4 text-[#2D2D2D]">
              Welcome to <span className="text-[#4534AC]">Workflo!</span>
            </h1>
            <div className="mb-4 text-[#999999] text-sm">
              <input
                type="email"
                id="email"
                placeholder="Your email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 bg-[#EBEBEB] rounded-lg focus:outline-none focus:border-[1px] focus:border-[#999999]"
                required
              />
            </div>
            <div className="mb-4 relative text-[#999999] text-sm">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 bg-[#EBEBEB] rounded-lg focus:outline-none focus:border-[1px] focus:border-[#999999]"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              >
                {showPassword ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13C6.6 5 17.4 5 21 13" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13C6.6 5 17.4 5 21 13" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 3L21 21" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>

            {error && <p className="text-[#a93b3b] text-sm text-center mb-4">{error}</p>}

            <div className="flex items-center justify-between">
              <button 
                type="submit"
                className="w-full text-sm bg-gradient-to-b from-[#887ccc] to-[#7166b2] text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:bg-indigo-600"
              >
                Login
              </button>
            </div>
            <h2 className="mt-4 text-[#606060] text-center text-sm">Don't have an account? Create a <Link href="/signup" className="text-[#0054A1]">new account.</Link> </h2>
          </form>
        </div> 
      </div>
    </div>
  );
}
export default Login