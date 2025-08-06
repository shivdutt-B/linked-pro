import React from "react";

const SignInForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50" />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition">Sign In</button>
    </form>
  );
};

export default SignInForm;
