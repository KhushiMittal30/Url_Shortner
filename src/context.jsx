import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({children}) => {

    const {data: user, loading, fn: fetchUser} = useFetch(getCurrentUser);
    
    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        fetchUser();
    },[]);

    //Because React always executes hooks in the order they appear in the component function, during render.
    //useEffect runs first and then isAuthneticated since
    //useEffect runs on mounting after the UrlPrivider runs on component mount.
   
  return <UrlContext.Provider value = {{user, fetchUser, loading, isAuthenticated}}>{children} </UrlContext.Provider>
};

/**
 * Custom hook to access the UrlContext value.
 *
 * @returns {any} The current context value for UrlContext.
 */
export const UrlState = () => { 
   return  useContext(UrlContext);
}

export default UrlProvider;
