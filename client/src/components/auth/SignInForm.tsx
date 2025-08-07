import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../hooks/auth/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../slice/userSlice"; // Assuming you have an action to set error in your slice
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from "../../hooks/auth/fetchUserInfo";

const SignInForm = () => {
  const { signIn } = useAuth();
  const { loading, error } = useSelector((state: any) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(formData.email, formData.password);
    await fetchUserInfo(dispatch);
    navigate('/');
  };

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        dispatch(setError(""));
      }
    }, 1000);
  }, [error]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="group">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-gray-50/50 hover:bg-white focus:bg-white rounded-sm"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="group">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="pl-10 pr-12 py-3 w-full rounded-sm border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-gray-50/50 hover:bg-white focus:bg-white"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {error && (
  <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-sm text-sm font-medium shadow-sm animate-fade-in">
    <svg
      className="w-5 h-5 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01M5.07 18.93a10 10 0 1113.86 0M12 2a10 10 0 100 20 10 10 0 000-20z"
      />
    </svg>
    <span>{error}</span>
  </div>
)}


      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-500/25 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {/* Social buttons */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Google Button */}
        <button
        disabled={true}
          type="button"
          className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-gray-700 cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>

        {/* Facebook Button */}
        <button
          type="button"
          disabled={true}
          className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-gray-700 cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
