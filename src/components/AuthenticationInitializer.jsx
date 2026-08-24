import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../services/authService";
import { clearCredentials, setCredentials } from "../store/authSlice";



const AuthenticationInitializer = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const initializeAuthentication = async () => {

            try {

                const user = await getCurrentUser();

                dispatch(setCredentials(user));

            } catch (error) {

                dispatch(clearCredentials());

            }

        };

        initializeAuthentication();

    }, [dispatch]);

    return null;
};


export default AuthenticationInitializer;