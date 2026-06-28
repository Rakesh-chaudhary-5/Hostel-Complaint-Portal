import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MyContext = createContext();

const MyProvider = ({ children }) => {

  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/loggedInUser",{withCredentials: true});
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <MyContext.Provider value={{user,setUser,loading}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;