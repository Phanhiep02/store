import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  getRequestLogin,
  setFormLogin,
} from "../../stores/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector((state) => state.auth.formLogin);
  const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  console.log(status);

  const onSubmitFormLogin = (e) => {
    e.preventDefault();
    dispatch(getRequestLogin(form));
  };
  const onchangeValue = (e) => {
    console.log(e.target.name, e.target.value);

    dispatch(setFormLogin({ name: e.target.name, value: e.target.value }));
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div className="w-full max-w-sm mx-auto py-8">
      <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
      {status === "loading" && (
        <p className="text-center text-blue-500 mb-4">Logging in...</p>
      )}
      {status === "error" && error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}
      <form action="" onSubmit={onSubmitFormLogin}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@mail.com"
            required
            onChange={onchangeValue}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="changeme"
            required
            onChange={onchangeValue}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
