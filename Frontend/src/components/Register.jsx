import axios from "axios";
import { ArrowRight, Building, Calendar, CreditCard, Home, Lock, Mail, Smartphone, User } from "lucide-react";
import { use, useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../Context/userContext";

function Register() {

  const {user} = useContext(MyContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    idCardNumber: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://hostel-complaint-portal-trnm.onrender.com/register",
        formData
      );
      if(res.data){
        setMessage("Registration successful...");
        toast.success("Registration successful...")
        setFormData({
        username: "",
        email: "",
        password: "",
        idCardNumber: "",
      })
      }
    } catch (err) {
      setMessage("Registration failed ❌");
      toast.success("Registration failed...")
    }

    setLoading(false);
  };

  if (user?.role === "user"){
    navigate("/feed");
  }else  if (user?.role === "admin"){
    navigate("/admin")
  }

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 p-6 relative overflow-hidden">
      
      {/* Abstract Background Shapes for Visual Interest */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative mt-20 bg-white/80 text-black backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-3xl border border-white/50">
        
        {/* Header Section */}
        <div className="text-center -mt-8 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white mb-4 shadow-lg">
            {/* <Home size={32} /> */}
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Hostel Registration
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            Join our campus community today
          </p>
        </div>

                {/* Message Alert */}
        {message && (
          <div className="mt-6 p-4 rounded-xl bg-green-50 text-green-700 border border-green-200 flex items-center justify-center space-x-2 animate-pulse">
            <span className="font-medium">{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 tracking-wide">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="full name"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 tracking-wide">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@university.edu"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 tracking-wide">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* ID Card */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 tracking-wide">ID Card Number</label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="idCardNumber"
                value={formData.idCardNumber}
                onChange={handleChange}
                placeholder="ID-2024-001"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Processing Request..." : "Create Account"}</span>
              {!loading && <ArrowRight size={20} />}
            </button>
          </div>

        </form>

        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all duration-200"
              >
                Login here
              </Link>
            </p>
          </div>



      </div>
    </div>
  );

}

export default Register;
