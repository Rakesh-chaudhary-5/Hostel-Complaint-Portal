import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ComplaintCard = ({ 
  id,
  role,
  userId,
  studentName, 
  title, 
  status, 
  description, 
  category, 
  date, 
  upvoteCount, 
  hasImage, 
  adminComment,
  resolved_date,
  setChange,
  change
}) => {
  const [votes, setVotes] = useState(upvoteCount);
  const [isUpvoted, setIsUpvoted] = useState(false);


const handleUpvote = async () => {
  if (isUpvoted) return;

  try {
    const newVotes = votes + 1;

    await axios.put(
      `http://hostel-complaint-portal-trnm.onrender.com/update_priority/${id}/${userId}`
    );
    window.location.reload(); // 🔥 important
  } catch (err) {
    console.log(err);
  }
};


  useEffect(() => {
  const checkUpvote = async () => {
    try {
      const res = await axios.get(
        "http://hostel-complaint-portal-trnm.onrender.com/hasUpvoted",
        {
          params: {
            userId: userId,
            complaintId: id
          }
        }
      );

      if (res.data) {
        setIsUpvoted(true);
      }

    } catch (err) {
      console.log(err);
    }
  };

  if (userId) checkUpvote();
}, [userId, id]);

const handleResolve = async () => {
    try {
      const res = await axios.put(`http://hostel-complaint-portal-trnm.onrender.com/resolveComplaint/${id}`);

      if(res.data){
        toast.success("Complaint is Resolved")
        setChange(!change);
      }

    } catch (err) {
      console.log(err);
    }
  };

const handleInProcess = async () => {
    try {
      const res = await axios.put(`http://hostel-complaint-portal-trnm.onrender.com/inProcessComplaint/${id}`);

      if(res.data){
        toast.success("Complaint is inProcess")
        setChange(!change);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);

  return `${day}-${month}-${year}`;
};


  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group">
      
      {/* 1. HEADER ROW: Student Name | Status */}
      <div className="flex justify-between items-start mb-6">
        {/* Student Name (Top Left) */}
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                {studentName.charAt(0)}
            </div>
            <span className="text-sm font-semibold  text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                {studentName}
            </span>
            {
              role === "admin" 
              ? <>
              <span className="text-sm font-bold  text-black px-3 py-1 ">
                Votes-{`>`}  
            </span>
            <span className="text-sm font-semibold -ml-5 text-white bg-green-600 px-[16px] py-2 tracking-widest rounded-full border border-gray-200">
                {upvoteCount}
            </span>
              </>
              : ""
            }
          
        </div>

        {/* Status Badge (Top Right) */}
        <div className="flex gap-2">
          <span className={`px-3 py-2 rounded-full text-xs text-white font-bold border uppercase tracking-wider ${
            status === 'PENDING' 
            ? 'bg-red-600' 
            : status === 'inProcess'
            ? 'bg-orange-600'
            : 'bg-green-600'
        }`}>
            {status}
        </span>
        {
          status === "RESOLVED" ? <span className="bg-green-50 flex items-center text-green-600 border-green-200 px-3 py-1 text-center rounded-full text-xs font-bold border uppercase tracking-wider">
          📅{formatDate(resolved_date)}
        </span> 
        : ""
        }
        </div>
      </div>

      {/* 2. TITLE SECTION (Centered with dashed lines) */}
      <div className="relative text-center mb-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200 border-dashed"></div>
        </div>
        <h3 className="relative inline-block bg-white px-4 text-lg font-bold text-gray-900">
            {title}
        </h3>
      </div>

      {/* 3. DESCRIPTION */}
      <div className="mb-6">
        <p className="text-black font-semibold text-sm leading-relaxed">
            <span className="font-semibold text-gray-900">Description: </span>
            {description}
        </p>
      </div>

      {/* 4. FOOTER ROW (Image, Category, Date, Actions) */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
        
        {/* Image Button */}
        {hasImage && (
            <button className="flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition">
                📷 Img
            </button>
        )}

        {/* Category Badge */}
        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
            🏷 {category}
        </span>

        {/* Date */}
        <span className="text-xs text-gray-600 font-medium">
            📅 {formatDate(date)}
        </span>

        {/* Spacer to push Upvote to right */}
        <div className="flex-grow"></div>
        <div className="flex gap-3">

  {/* 🔹 Upvote Button */}
  <button 
    onClick={role !== "admin" && status != "RESOLVED" ? handleUpvote : undefined}
    className={` ${
      role == "admin" || status == "RESOLVED" ? "cursor-not-allowed hidden" : "cursor-pointer flex"
    } items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95 ${
      isUpvoted 
        ? 'bg-indigo-600 text-white shadow-indigo-200' 
        : 'bg-gray-900 text-white hover:bg-gray-800 shadow-gray-200'
    }`}
  >
    ▲ Upvote 
    <span className="bg-white/20 px-1.5 rounded text-xs ml-1">
      {votes}
    </span>
  </button>

  {/* 🔹 Resolve Button (Admin Only) */}

  {role === "admin" && (
    <>

    <button
      onClick={status != "inProcess" ? handleInProcess : undefined}
      className={`px-4 py-2 ${status == "inProcess" ? "cursor-not-allowed opacity-50": "cursor-pointer"}  bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-bold shadow-md transition-all`}
    >
      inProcess
    </button>

    <button
      onClick={status != "RESOLVED" ? handleResolve : undefined}
      className={`px-4 py-2 ${status == "RESOLVED" ? "cursor-not-allowed opacity-50": "cursor-pointer"}  bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold shadow-md transition-all`}
    >
      Resolve
    </button>
    </>
  )}

</div>
       
      </div>

    </div>
  );
};


export default ComplaintCard;