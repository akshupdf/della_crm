import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer } from "react-toastify";
import { useAuth } from "./AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import Cookies from 'js-cookie'; 
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../redux/appSlice";
//import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const {isAuthenticated, login } = useAuth();

  // const {isAuthenticated,login } = useAuth();
  
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const role = Cookies.get('role');
  //     redirectBasedOnRole(role);
  //   }
  // }, [isAuthenticated, navigate]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const role = Cookies.get('role');
  //     redirectBasedOnRole(role);

  //     window.history.pushState(null, null, window.location.href); // 
  //     window.addEventListener("popstate", preventBackNavigation); // 
  //   }

  //   return () => {
  //     window.removeEventListener("popstate", preventBackNavigation); 
  //   };
  // }, [isAuthenticated, navigate]);

  // const preventBackNavigation = () => {
  //   window.history.pushState(null, null, window.location.href); 
  // };

  


  // const redirectBasedOnRole = (role) => {
    
  //   switch(role) {
  //     case 'agent':
  //       navigate("/DashboardAgent");
  //       break;
  //     case 'admin':
  //       navigate("/Dashboard");
  //       break;
  //     case 'super_admin':

  //       navigate("/DashboardSA");
  //       break;
  //     case 'TL':
  //       navigate("/DashboardTL");
  //       break;
  //     default:
  //       navigate("/");
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous success or error messages


    const values = {
      "username": username,
      "password": password
    }


    try {
     const response = await dispatch(getLogin(values)).unwrap();

      const { token, role, user , id} = response;

      login(token, role, user , id);
      

      if (!token || !role) {
        throw new Error("No access token or role returned");
      }

      // login(access_token, role, user , id);

      if (role === "superadmin") {
        toast?.success("Login Successful");
        navigate("/dashboard");
      //toast.success("Login Successful");
      } else if (role === "tl") {
        toast?.success("Login Successful");
        navigate("/dashboard");
      } else if (role === "agent") {
        toast?.success("Login Successful");
        navigate("/dashboard");
      }else if (role === "reception") {
        toast("Login Successful");
        navigate("/dashboard");
      }else if (role === "sales") {
        toast?.success("Login Successful");
        navigate("/dashboard");
      }

      
    } catch (error) {
      if (error === 401) {
        alert("Login failed: Invalid credentials");
        toast.error("Login failed:",error.message);
      }else if (error === 400){
        toast("User Not Found");
      }else{

        toast.error("Login failed: " );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[87.8vh] rounded-xl">
      {/* <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      > */}
      <div className="bg-white p-6 rounded-lg shadow-md w-96"> 
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500 mt-3"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)} 
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 mt-5 text-gray-600" /> 
            ) : (
              <FaEye className="h-5 w-5 mt-5 text-gray-600" /> 
            )}
          </button>
        </div>
        <button
          type="submit"
          className="px-16 bg-blue-500 w-full text-white font-semibold rounded-md p-2 hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Login
        </button>
        </div>
      {/* </form> */}
      <ToastContainer  containerId={"loginToast"} />
    </div>
  );
};

export default Login;