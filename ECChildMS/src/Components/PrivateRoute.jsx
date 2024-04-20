import PropTypes from 'prop-types'; // for type-checking props
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({ children }) => {
    return localStorage.getItem('valid') ? children : <Navigate to='/' />
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default PrivateRoute