// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaWarehouse, FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      // const response = await axios.post('http://localhost:3000/api/auth/login', {
      //   username,
      //   password,
      // });
      
      // setMessage('Login successful. Redirecting...');
      // // Store token in localStorage for future API calls
      // localStorage.setItem('token', response.data.token);
      // localStorage.setItem('user', JSON.stringify(response.data.user));

      localStorage.setItem('username', username);
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full mb-4">
            <FaWarehouse className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Inventory Manager</h1>
          <p className="text-gray-500 mt-2">Sign in to access your inventory</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <p>{error}</p>
          </div>
        )}
        
        {message && (
          <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
            <p>{message}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : (
                <FaSignInAlt className="mr-2" />
              )}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
            Forgot password?
          </a>
        </div>
        
        <div className="mt-8 pt-5 border-t border-gray-200 text-center text-gray-500 text-sm">
          © 2025 Inventory Management System
        </div>
      </div>
    </div>
  );
};

export default Login;