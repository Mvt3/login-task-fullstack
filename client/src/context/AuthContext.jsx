import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";



export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new error("useAuth must be used within an AuthProvider")
    }
    return context
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    //Register
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data)
        }
    };

    //Login
    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            setIsAuthenticated(true);
            setUser(res.data);
            console.log(res)

        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            };
            setErrors(error.response.data.message)

        }
    }

    //Logout
    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    };


    //Cookie verification
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
                

            }
            try {
                const res = await verifyTokenRequest(cookies.tooken)
                if (!res.data){
                    setIsAuthenticated(false)
                    setLoading(false);
                    return
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin();
    }, []);



    return (
        <AuthContext.Provider value={{ signup, signin, logout,loading, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    );
};