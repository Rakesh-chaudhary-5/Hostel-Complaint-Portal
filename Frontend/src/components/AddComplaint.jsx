import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  FileText,
  AlignLeft,
  Tag,
  AlertTriangle,
  Calendar,
  Image as ImageIcon,
  Send,
  CheckCircle,
  XCircle
} from "lucide-react";
import { MyContext } from "../Context/userContext";
import { toast } from "react-toastify";

function AddComplaint() {
  const { user } = useContext(MyContext);
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    description: "",
    category: "",
    username: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
         setFormData({...formData,userId: user?.id,username: user?.username})
  },[user])

console.log(formData);
  

  // Handle text change
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
      await axios.post("http://localhost:8080/addComplaints", formData);

      setMessage("Complaint submitted successfully");
      toast.success("Complaint submitted successfully.")
      setFormData({userId: "", title: "", description: "", category: ""});


    } catch (err) {
      toast.error("error.")
      setMessage("Failed to submit complaint");
    }

    setLoading(false);
  };

  const isError = message.includes("Failed");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-orange-50 to-amber-50 p-6 font-sans">
      <div className="bg-white/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 md:p-12 w-full max-w-3xl border border-white/50">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4 shadow-sm">
            <AlertTriangle size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Report an Issue
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Submit your complaint to administration for a quick resolution.
          </p>
        </div>

        {/* Dynamic Message Banner */}
        {message && (
          <div className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
            isError ? "bg-red-50 border-red-200 text-red-700" : "bg-green-50 border-green-200 text-green-700"
          }`}>
            {isError ? <XCircle size={20} className="text-red-500" /> : <CheckCircle size={20} className="text-green-500" />}
            <p className="font-medium">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          
          {/* Title */}
          <div className="space-y-2 group">
            <label className="text-sm font-semibold text-gray-700 ml-1">Title</label>
            <div className="relative">
              <FileText className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="E.g., Broken AC in Room 101"
                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2 group">
            <label className="text-sm font-semibold text-gray-700 ml-1">Category</label>
            <div className="relative">
              <Tag className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-gray-800 appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Select Category</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Internet">Internet</option>
              </select>
            </div>
          </div>

          {/* Date */}
          {/* <div className="space-y-2 group">
            <label className="text-sm font-semibold text-gray-700 ml-1">Incident Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
              <input
                type="date"
                name="complaintDate"
                value={formData.complaintDate}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-gray-800 cursor-pointer"
                required
              />
            </div>
          </div> */}

          {/* Description */}
          <div className="md:col-span-2 space-y-2 group">
            <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Please provide specific details about the issue..."
                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 resize-none"
                required
              ></textarea>
            </div>
          </div>

          {/* Image Upload */}
          {/* <div className="md:col-span-2 space-y-2 group">
            <label className="text-sm font-semibold text-gray-700 ml-1">Attachment (Optional)</label>
            <div className="relative flex items-center w-full pl-4 py-2.5 bg-white/60 border border-gray-200 rounded-2xl focus-within:ring-4 focus-within:ring-red-500/10 focus-within:border-red-500 transition-all">
              <ImageIcon className="text-gray-400 group-focus-within:text-red-500 transition-colors mr-3" size={18} />
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full text-sm text-gray-500 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-xl file:border-0 
                  file:text-sm file:font-semibold 
                  file:bg-red-50 file:text-red-600 
                  hover:file:bg-red-100 
                  file:transition-colors file:cursor-pointer cursor-pointer focus:outline-none"
              />
            </div>
          </div> */}

          {/* Submit */}
          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center cursor-pointer justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Complaint</span>
                  <Send size={20} />
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddComplaint;