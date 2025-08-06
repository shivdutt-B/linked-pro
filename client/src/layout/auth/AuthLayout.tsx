import React, {useState} from "react";
import {Lock} from "lucide-react"
import SignInForm from "../../components/auth/SignInForm"
import SignUpForm from "../../components/auth/SignUpForm"

const AuthLayout = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome {isSignIn ? 'Back' : 'to Our Platform'}
          </h1>
          <p className="text-gray-600">
            {isSignIn ? 'Sign in to your account to continue' : 'Create your account to get started'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-md shadow-xl border border-white/20 p-8">
          {/* Tab Buttons */}
          <div className="mb-8">
            <div className="relative bg-gray-100 rounded-sm p-1">
              <div 
                className={`absolute top-1 bottom-1 w-[49%] bg-white rounded-lg shadow-sm transition-transform duration-200 ease-out ${
                  isSignIn ? 'translate-x-0' : 'translate-x-full'
                } rounded-sm`}
              ></div>
              <div className="relative grid grid-cols-2 rounded-sm">
                <button
                  className={`px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                    isSignIn ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setIsSignIn(true)}
                >
                  Sign In
                </button>
                <button
                  className={`px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                    !isSignIn ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setIsSignIn(false)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="transition-all duration-300 ease-in-out">
            {isSignIn ? <SignInForm /> : <SignUpForm />}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          {isSignIn ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setIsSignIn(false)}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignIn(true)}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;