import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import { FaKey, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { role, logout , token} = useAuth(); // Fetch user's name from AuthContext
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const dropdownRef = useRef(null); // Reference for the dropdown menu

  const confirmLogout = () => {
    Swal.fire({
      text: `Your session has been expired Please Re-Login`,
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Re-Login',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        navigate('/')
        
      }
    });
  }
  
  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      if(error.response.status===401){
        confirmLogout()
      }
      else{
        toast.error('Logout failed. Please try again.');
      }
      console.error('Logout failed', error);
    }
  };


  // Confirm before logging out using SweetAlert
  const confirmLogoutUser = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out from the application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085D6',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, stay logged in',
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };



  return (
    <div>
      <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 shadow-lg">
<div className='w-[5%]'>

</div>
      <div className="flex items-end space-x-4 ">
      <h1 className="text-small">{dateTime.toLocaleString()}</h1> {/* Date and Time */}

        {/* Welcome Message */}
                  {/* <h1 className="text-xl font-bold">{capitalizedUser}</h1> */}

        <span className="text-xl font-bold">{role || 'Guest'}</span>  <span className='ms-0 mr-0'> ({role || 'Guest'})</span>
        
        {/* Dropdown for Actions */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
             className="flex items-center space-x-2 focus:outline-none"
          >
            <AiOutlineUser className="text-2xl" />
          </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2"
              ref={dropdownRef}>
           

                  <div className='ml-2 text-center align-center items-center justify-center w-auto mr-2 hover:bg-gray-200'>
                <button
                  className="flex items-center px-4 py-2 hover:bg-gray-200 justify-center"
                  onClick={confirmLogoutUser}
                  >
                  <FaSignOutAlt className="-ml-2 mr-2" /> Logout
                </button>
                  </div>
              </div>
            )}
          </div>
        </div>
      </nav>


    </div>
  );
};

export default Navbar;