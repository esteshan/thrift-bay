import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/authApi";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading, isError }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full h-full">
        <h5 className="text-2xl mb-4">Login</h5>
        {isError && (
          <p className="text-red-500">Error during login. Please try again.</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="mt-1 p-2 w-full rounded-md border border-gray-300"
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 p-2 w-full rounded-md border border-gray-300"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <input
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              type="submit"
              value="Login"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
