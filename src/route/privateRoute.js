import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem('jwtToken'); 
    return token ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;