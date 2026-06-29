import { Link, Navigate } from "react-router-dom";
import ComplaintCard from "./ComplaintCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "../Context/userContext";

function Feed() {
    const { user } = useContext(MyContext);
    const [complaints,setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [filter2,setFilter2] = useState("all");


  useEffect(()=>{
   const fetch = async()=>{
    const res = await axios.get("http://hostel-complaint-portal-trnm.onrender.com/fetchComplaints");
    setComplaints(res.data);
    setFilteredComplaints(res.data);
   }
   fetch();
  },[])

    //handleFilter2
  const handleFilter2 = (value)=>{
    setFilter2(value);
  }

    //complaints
    useEffect(()=>{
 if (filter2 === "pending") {
    setFilteredComplaints(complaints.filter((e) => e.status == "PENDING"));
  } else if (filter2 === "inProcess") {
    setFilteredComplaints(complaints.filter((e) => e.status == "inProcess"));
  }else if (filter2 === "resolved") {
    setFilteredComplaints(complaints.filter((e) => e.status == "RESOLVED"));
  }else {
    setFilteredComplaints(complaints);
  }
  },[filter2,complaints])

// if (!user) {
//   return <Navigate to="/" />;
// }

console.log(complaints);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-8 mt-10 text-center">Recent Complaints</h1>
      <hr />

 <div className="my-6 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:shadow-[0_4px_15px_-3px_rgba(6,81,237,0.15)] sm:flex-row sm:items-center sm:justify-between">
  {/* Left Side: Icon & Text */}
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
    </div>
    <div>
      <h3 className="text-base font-semibold text-gray-900">
        Filter Complaints
      </h3>
      <p className="text-sm text-gray-500">
        View by current status
      </p>
    </div>
  </div>

  {/* Right Side: Custom Select */}
  <div className="relative">
    <select onChange={(e)=>{handleFilter2(e.target.value)}} className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 outline-none transition-all hover:border-gray-300 hover:bg-gray-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:w-48 cursor-pointer">
      <option className="font-semibold" value="all">All Complaints</option>
      <option className="font-semibold" value="pending">🟡 Pending</option>
      <option className="font-semibold" value="inProcess">🔵 In Process</option>
      <option className="font-semibold" value="resolved">🟢 Resolved</option>
    </select>
    {/* Custom Dropdown Arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  </div>
</div>
      
      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-10 max-w-7xl mx-auto">
  
        {
          filteredComplaints?.sort((a,b)=> b.priority-a.priority).map((e)=>(
          <ComplaintCard 
            id ={e.id}
            role={user?.role}
            userId={user?.id}
            key={e.id}
            studentName={e.username}
            title={e.title}
            status={e.status}
            description={e.description}
            category={e.category}
            date={e.complaintDate}
            upvoteCount={e.priority}
            resolved_date={e.resolveDate}
        />
          ))
        }
      </div>
<Link
  to="/add_complaint"
  className="fixed bottom-6 right-10 z-50 group"
>
  {/* Ping Animation Ring (behind the button) */}
  <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-ping"></span>

  <div className="relative flex items-center justify-center">
    
    {/* Enhanced Tooltip */}
    <div className="absolute right-20 bg-[#9810FA] text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-lg whitespace-nowrap">
      New Complaint
      {/* Tiny Arrow pointing to button */}
      <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#9810FA] rotate-45"></div>
    </div>

    {/* Gradient Button */}
    <div
      className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 
      text-white rounded-full flex items-center justify-center 
      shadow-[0_0_25px_rgba(79,70,229,0.6)] 
      transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-90"
    >
      <svg className="w-8 h-8 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
    </div>
  </div>
</Link>
    </div>
  );
}

export default Feed;