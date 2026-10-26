import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [login, chngLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (login) {
        const formData = JSON.stringify({
          email: email,
          password: password,
        });
        response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: formData,
        });
      } else {
        const formData = JSON.stringify({
          name: name,
          email: email,
          password: password,
        });
        response = await fetch(`${apiUrl}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: formData,
        });
      }

      const resData = await response.json();
      setData(resData.message);
      if (resData.message === "success") {
        navigate('/dashboard2');
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setData("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full px-4 py-12">
      <div className="w-full max-w-md">
        {login && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center text-zinc-100">Welcome Back</h1>
            <p className="text-center pt-2 text-zinc-400 text-sm">
              Sign in to your dashboard
            </p>
          </div>
        )}
        {!login && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center text-zinc-100">Create account</h1>
            <p className="text-center pt-2 text-zinc-400 text-sm">
              Start shortening URLs for free
            </p>
          </div>
        )}

        <div className="flex justify-center rounded-2xl w-full items-center bg-zinc-900/70 backdrop-blur-xl py-8 border-zinc-800 border shadow-2xl shadow-black/60">
          <form
            className="flex flex-col text-zinc-100 w-[88%] gap-4"
            onSubmit={handleSubmit}
          >
            {!login && (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-zinc-300 font-medium text-sm"
                >
                  Display name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2.5 rounded-lg outline-0 bg-zinc-950 border border-zinc-800 focus:border-indigo-500 text-zinc-100 placeholder:text-zinc-600 transition-all text-sm"
                  placeholder="Your name"
                  required
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-zinc-300 font-medium text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2.5 rounded-lg outline-0 bg-zinc-950 border border-zinc-800 focus:border-indigo-500 text-zinc-100 placeholder:text-zinc-600 transition-all text-sm"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-zinc-300 font-medium text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2.5 rounded-lg outline-0 bg-zinc-950 border border-zinc-800 focus:border-indigo-500 text-zinc-100 placeholder:text-zinc-600 transition-all text-sm"
                placeholder="*******"
                required
              />
            </div>
            {login && (
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium cursor-pointer p-2.5 rounded-lg shadow-lg shadow-indigo-600/25 transition-all mt-2" type="submit" >
                Login
              </button>
            )}
            {!login && (
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium cursor-pointer p-2.5 rounded-lg shadow-lg shadow-indigo-600/25 transition-all mt-2" type="submit">
                Create Account
              </button>
            )}
          </form>
        </div>

        {login && (
          <p className="pt-4 text-center text-zinc-400 text-sm">
            New to slink.io?{" "}
            <span
              className="text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium transition-colors"
              onClick={() => chngLogin(!login)}
            >
              Sign up here
            </span>
          </p>
        )}
        {!login && (
          <p className="pt-4 text-center text-zinc-400 text-sm">
            Already have an account?{" "}
            <span
              className="text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium transition-colors"
              onClick={() => chngLogin(!login)}
            >
              Login here
            </span>
          </p>
        )}
        {!login && data === "user exists" && (
          <p className="text-center text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2 px-3 rounded-lg text-sm mt-3">User already exists</p>
        )}
        {login && data === "invalid" && (
          <p className="text-center text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2 px-3 rounded-lg text-sm mt-3">Invalid email or password</p>
        )}
      </div>
    </div>
  );
};

export default Login;
