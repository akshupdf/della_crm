import React, { useState } from 'react'
import { toast } from "react-toastify";
import { FiEye, FiEyeOff, FiEdit, FiTrash2 } from "react-icons/fi"; // Import eye, edit, and trash icons
import { addUser, fetchUsersTl } from '../redux/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './AuthContext';

export default function Tlteam({setIsModalOpen}) {

    const dispatch = useDispatch();
    const { id} = useAuth();

    const [currentAgent, setCurrentAgent] = useState({
        name: "",
        email: "",
        username: "",
        password: ""
      });

      const handleRegister = async (e) => {
        e.preventDefault();
      
        const data = {
          name: currentAgent.name,
          email: currentAgent.email,
          username: currentAgent.username,
          password: currentAgent.password,
          role: "agent",
          tl: id,
        };
      
        try {
          const result = await dispatch(addUser(data)).unwrap(); // Unwrap to handle resolved/rejected
          
          toast.success("Agent registered successfully!");
      
          dispatch(fetchUsersTl(id)); // Refresh user list
          setCurrentAgent({
            name: "",
            username: "",
            email: "",
            password: "",
          });
          setIsModalOpen(false);
        } catch (error) {
          if (error === "user already exists") {
            toast.error("User already exists!");
          } else {
            toast.error("Failed to register agent!");
          }
        }
      };


  return (
    <div>
      <div className="col-span-12 md:col-span-4 bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Create Agent</h1>
          <form className="space-y-6" onSubmit={(e) => handleRegister(e, currentAgent)}>
      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={currentAgent.name}
          onChange={(e) =>
            setCurrentAgent({ ...currentAgent, name: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md p-2 mt-2"
          required
        />
      </div>

      {/* Username Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={currentAgent.username}
          onChange={(e) =>
            setCurrentAgent({ ...currentAgent, username: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md p-2 mt-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="text"
          value={currentAgent.email}
          onChange={(e) =>
            setCurrentAgent({ ...currentAgent, email: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md p-2 mt-2"
          required
        />
      </div>

      {/* Password Input */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={currentAgent.password}
          onChange={(e) =>
            setCurrentAgent({ ...currentAgent, password: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md p-2 mt-2"
          required
        />
        {/* <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="absolute right-3 top-9"
        >
          {passwordVisible ? (
            <FiEyeOff className="text-gray-600" size={20} />
          ) : (
            <FiEye className="text-gray-600" size={20} />
          )}
        </button> */}
      </div>


      {/* Submit Button */}
      <button
        type="submit" // Corrected type
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
      >
        Register Agent
      </button>
    </form>
        </div>
    </div>
  )
}
