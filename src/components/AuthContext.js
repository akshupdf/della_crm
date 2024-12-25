import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';  // Import SweetAlert
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();
const roleSpecificRoute = {
  agent: '/DashboardAgent',
  admin: '/Dashboard',
  super_admin: '/DashboardSA',
  TL: '/TLDashboardTL',
};
export const AuthProvider = ({ children }) => {
  
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [role, setRole] = useState(Cookies.get('role') || null);
  const [name, setName] = useState(Cookies.get('name') || '');
  const [id,setId] = useState(Cookies.get('id') || null);
  const [loading, setLoading] = useState(true); // Loading state
  const [isOpen, setIsOpen] = useState(false);  // Sidebar state
  
  
  const toggleSidebar = () => {
    // console.log('clickeddd');    
    setIsOpen(!isOpen)
  };

  const navigate = useNavigate();
  useEffect(() => {
    // const storedToken = Cookies.get("token");
    const storedtoken = Cookies.get("token")?.replace(/^0\|/, ""); // Remove '0|' prefix if present
    const storedrole = Cookies.get("role");
    const storedname = Cookies.get("name"); // Retrieve the stored name
    const storedid = Cookies.get("id"); // Retrieve the stored user ID
    if (storedtoken && storedrole) {
      setToken(storedtoken);
      setRole(storedrole);
      setName(storedname); // Set the stored name
      setId(storedid); // Set the stored user ID
    } else {
      navigate("/"); // Redirect to login
    }
    setLoading(false); // Set loading to false after checking
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = Cookies.get('token');
      setToken(currentToken || null);
      if (!currentToken && token) {
        setIsOpen(false)
        showTokenExpiredAlert();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [token]);


  const showTokenExpiredAlert = () => {
    Swal.fire({
      title: 'Session Expired',
      text: 'Your token has been expired. Please log in again.',
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Re-login',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if(isOpen){
          return;
        } else {
          logout();
          navigate("/");  // Log the user out
        }

      }
    });

  };
  
  const login = (newToken, newRole, newName, newid) => {
    setToken(newToken);
    setRole(newRole);
    setName(newName);
    setId(newid);
    Cookies.set('token', newToken);
    Cookies.set('role', newRole);
    Cookies.set('name', newName);
    Cookies.set('id', newid);
    setIsAuthenticated(true);
    navigate(roleSpecificRoute[newRole] || "/"); // Redirect after login
  };

  const logout = () => {
    setIsOpen(false)
    setToken(null);
    setRole(null);
    setName(''); // Clear name
    setId('');
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('name');
    Cookies.remove('id');
    setIsAuthenticated(false);
    navigate("/");
  };
  // const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, name,  id ,loading,login, logout,isOpen,toggleSidebar }}>
       {!loading && children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);