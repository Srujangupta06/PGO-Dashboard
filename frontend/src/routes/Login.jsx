import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { backendUrl, toastNoficationSettings } from "../utils/utils";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import validator from "validator";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onHandleFormSubmit = (e) => {
    e.preventDefault();
    // If no errors, proceed with login
    if (!validator.isEmail(email)) {
      setErrorMessage("Invalid Email");
      return;
    }
    const userCredentials = {
      email: email,
      password: password,
    };
    loginUser(userCredentials);
    setErrorMessage("");
    setEmail("");
    setPassword("");
  };

  const loginUser = async (userCredentials) => {
    try {
      const apiUrl = `${backendUrl}/api/auth/login`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      if (response.ok) {
        const data = await response.json();
        const { message, jwtToken } = data;
        Cookies.set("jwtToken", jwtToken, { expires: 7 });
        toast.success(message, toastNoficationSettings);
        navigate("/dashboard");
      } else {
        const data = await response.json();
        const { message } = data;
        toast.error(message, toastNoficationSettings);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.message, toastNoficationSettings);
    }
  };
  const token = Cookies.get("jwtToken");
  if (token !== undefined) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="flex flex-col items-center min-h-screen pt-8 gap-y-6 bg-gray-50">
      <h1 className="text-2xl font-semibold">Login</h1>
      <div className="p-2 w-[90%] md:w-[40%] mx-auto">
        <form
          className="px-8 py-8 rounded-md bg-white shadow-md"
          onSubmit={onHandleFormSubmit}
        >
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              id="email"
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your Email"
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-1.5 px-1 transition-all duration-200"
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-1.5 px-1 pr-10 transition-all duration-200"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <IoEyeOffOutline size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
          </div>
          {/* {errorMessage && (
            <p className="mb-2  text-red-700 font-semibold text-sm">
              *{errorMessage}
            </p>
          )} */}
          {/* Submit Button */}
          <button className="mb-4 w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-200">
            Login
          </button>
          <div className="flex items-center gap-x-2">
            <span className="text-gray-500 text-sm">
              Don't have an Account?
            </span>
            <Link to="/auth/register">
              <span className="text-blue-500 text-sm underline">
                Register Here
              </span>
            </Link>
            {/* <Link to="/register">
              <span className="text-blue-500 text-sm">Forgot Password</span>
            </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
