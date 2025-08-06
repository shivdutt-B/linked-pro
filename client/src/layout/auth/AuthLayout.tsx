import React, { useState } from "react";
import SignInForm from "../../components/auth/SignInForm";
import SignUpForm from "../../components/auth/SignUpForm";

const AuthLayout = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6 flex justify-center">
          <button
            className={`px-4 py-2 font-semibold rounded-l ${isSignIn ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-r ${!isSignIn ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>
        {isSignIn ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default AuthLayout;
