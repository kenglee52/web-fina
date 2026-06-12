import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url } from '@/componet/unity/Part';
import { useAdmin } from '@/context/AdminContext'; // import context

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAdmin } = useAdmin(); // ดึงฟังก์ชัน setAdmin จาก context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!form.username || !form.password) {
      setError('Please provide username and password');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${url.base_url}/api/login`, {
        username: form.username,
        password: form.password,
      });

      const { token, admin } = response.data;

      // เก็บลง localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));

      // 🔑 อัปเดต context ทันที
      setAdmin(admin);

      // navigate ตาม role_name หรือ department_name
      if (admin.role_name === 'manager') {
        navigate('/manager-dashboard');
      } else if (admin.role_name === 'hr') {
        navigate('/hr-dashboard');
      } else if (admin.role_name === 'marketing') {
        navigate('/marketing-dashboard');
      } else {
        setError('Unknown role. Please contact support.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('Network error. Please check your connection or ensure the server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-orange-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <img src="/fina-logo-color.png" alt="Fina Logo" className="h-16 w-16 object-contain mx-2" />
        </div>

        {error && <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>}

        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-colors duration-200"
            placeholder="Enter your username"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-colors duration-200"
            placeholder="Enter your password"
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-500"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
