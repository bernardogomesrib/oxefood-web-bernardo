import { Navigate } from "react-router-dom";
import { isTokenExpired, isUserLoggedIn, logout } from '../util/AuthenticationService';
import { notifyError } from "./util";

const ProtectedRoute = ({ children }) => {
    
    if (!isUserLoggedIn()) {
        // user is not authenticated

        return <Navigate to="/" />;
    }else if (isTokenExpired()) {
        notifyError("Sua sessão expirou. Faça login novamente.");
        setTimeout(() => {
            logout();
        }, 2000);
        return <Navigate to="/" />;
    }
    
    return children;
};
export default ProtectedRoute;