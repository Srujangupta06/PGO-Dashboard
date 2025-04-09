import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { backendUrl, toastNoficationSettings } from "../utils/utils";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const checkFormValidations = () => {
    let errors = [];
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!]).{8,}$/;
    const mobileRegex = /^\d{10}$/;

    if (!passwordRegex.test(password)) {
      errors.push(
        "Password must include at least one uppercase, one lowercase, one number, and one special character (@, #, $, !)."
      );
    }
    if (!mobileRegex.test(mobileNumber)) {
      errors.push("Mobile number must be exactly 10 digits.");
    }

    return errors;
  };

  const onHandleLoginBtn = () => {
    navigate("/auth/login");
  };

  const onHandleFormSubmit = (e) => {
    e.preventDefault();

    const errors = checkFormValidations(); // Get errors instead of relying on state

    if (errors.length > 0) {
      setErrorMessage(errors.join("\n")); // Update error state for UI display
      return; // Stop API call
    }

    // If no errors, proceed with registration
    const newUserCredentials = {
      name: fullName,
      email,
      password,
      mobileNumber,
    };

    registerUser(newUserCredentials);
    setErrorMessage("");
    setFullName("");
    setEmail("");
    setPassword("");
    setMobileNumber("");
  };

  const registerUser = async (userCredentials) => {
    try {
      const apiUrl = `${backendUrl}/api/auth/register`;

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
        toast.success(message, toastNoficationSettings);
        Cookies.set("jwtToken", jwtToken, { expires: 7 });
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
      <h1 className="text-2xl font-semibold">Registration</h1>
      <div className="p-2 w-[90%] md:w-[40%] mx-auto">
        <form
          className="px-8 py-4 rounded-md bg-white shadow-md"
          onSubmit={onHandleFormSubmit}
        >
          <div className="mb-6">
            <label htmlFor="full-name" className="block mb-2 font-medium">
              Full Name
            </label>
            <input
              id="full-name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrorMessage("");
              }}
              required
              type="text"
              placeholder="Enter your Full Name"
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-1.5 px-1 transition-all duration-200"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
              id="email"
              type="email"
              placeholder="Enter your Email"
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-1.5 px-1 transition-all duration-200"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="contact-number" className="block mb-2 font-medium">
              Mobile Number
            </label>
            <input
              id="contact-number"
              type="tel"
              maxLength="10"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                setErrorMessage("");
              }}
              required
              placeholder="Enter your Mobile Number"
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                required
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
                  <IoEyeOffOutline size={20} className="cursor-pointer " />
                ) : (
                  <IoEyeOutline size={20} className="cursor-pointer " />
                )}
              </button>
            </div>
          </div>
          {errorMessage && (
            <p className="mb-2 italic text-red-700 font-semibold text-sm">
              *{errorMessage}
            </p>
          )}
          {/* Submit Button */}
          <button className="mb-2 w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-200">
            Register
          </button>

          <div className="flex items-center w-full my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-400 text-xs tracking-wide uppercase">
              or continue with account
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button
            className="mb-2 w-full mt-2 bg-white text-blue-500 border border-blue-500 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 shadow-sm"
            onClick={onHandleLoginBtn}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
