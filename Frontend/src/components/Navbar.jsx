import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../Context/userContext";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user,setUser} = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogOut = async ()=>{
     
      const res = await axios.post("http://hostel-complaint-portal-trnm.onrender.com/logout",{},{ withCredentials: true})
       setUser(null)
       navigate("/login");
  }  

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              H
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">
              Hostel<span className="text-indigo-600">Assist</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-20">
          <div className="hidden md:flex text-lg gap-8 text-gray-700 font-medium">
          <Link className="hover:underline" to={"/"}> Home </Link>
         {
          user?.role == "user"
          ?  <>
          <Link className="hover:underline" to={"/feed"}> feed </Link>
          <Link className="hover:underline" to={"/add_complaint"}> add_complaint </Link>
          </>
          : user?.role == "user"
           ? <Link className="hover:underline" to={"/admin"}> admin </Link>
           : ""
         }
        </div>

        {
          user ? (
            <button onClick={handleLogOut} className="bg-orange-700 text-white px-5 py-2 rounded-lg cursor-pointer" >Logout</button>
          ) : (
            <Link to="/login" className="bg-indigo-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition" > Login </Link>
          )
        }
          </div>

          {/* MOBILE MENU BUTTON (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none p-2"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link 
              to="/" 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/rules" 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsOpen(false)}
            >
              Hostel Rules
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsOpen(false)}
            >
              Contact Support
            </Link>
            
            <div className="border-t border-gray-100 my-2 pt-2 flex flex-col gap-3">
              <Link 
                to="/login"
                className="block text-center w-full px-4 py-3 border border-indigo-200 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="block text-center w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;