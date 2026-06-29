import { useContext, useEffect, useState } from "react";
import Application from "./Application ";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { MyContext } from "../Context/userContext";
import ComplaintCard from "./ComplaintCard";
import { toast } from "react-toastify";

function Admin() {
  const { user, loading } = useContext(MyContext);

  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filter,setFilter] = useState("all");

  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filter2,setFilter2] = useState("all");

  const [change, setChange] = useState(false);
  const [activeTab, setActiveTab] = useState("applications");

  // 🔥 Fetch both data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const appRes = await axios.get("http://hostel-complaint-portal-trnm.onrender.com/userData");
        setApplications(appRes.data);
        setFilteredApplications(appRes.data)

        const compRes = await axios.get("http://hostel-complaint-portal-trnm.onrender.com/fetchComplaints");
        setComplaints(compRes.data);
        setFilteredComplaints(compRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [change]);

  // 🔹 Application actions
  const handleApprove = async (id) => {
    const res = await axios.put(`http://hostel-complaint-portal-trnm.onrender.com/acceptReq/${id}`);
    if(res.data){
      toast.success("User request APPROVED.")
    }
    setChange(!change);
  };

  const handleReject = async (id) => {
    const res = await axios.put(`http://hostel-complaint-portal-trnm.onrender.com/rejectReq/${id}`);
    if(res.data){
      toast.success("User request REJECTED.")
    }
    setChange(!change);
  };



  //handleFilter
  const handleFilter = (value)=>{
    setFilter(value);
  }
  //handleFilter2
  const handleFilter2 = (value)=>{
    setFilter2(value);
  }

//applications
  useEffect(()=>{
 if (filter === "pending") {
    setFilteredApplications(applications.filter((e) => !e.verified));
  } else if (filter === "approved") {
    setFilteredApplications(applications.filter((e) => e.verified));
  } else {
    setFilteredApplications(applications);
  }
  },[filter,applications])

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

    // 🔐 Protect route
  if (loading) return <h2>Loading...</h2>;

  if (!user || user.role !== "admin") {
    // return <Navigate to="/" />;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* 🔥 TOGGLE */}
      <div className="flex justify-center mt-20 border-b mb-8">
        {["applications", "complaints"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 cursor-pointer font-semibold italic capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= APPLICATIONS ================= */}
      {activeTab === "applications" && (
        <>
                  <h1 className="text-3xl font-bold text-orange-400  mb-8 text-center">
            Hostel Applications
          </h1> 

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
                Filter Applications
              </h3>
              <p className="text-sm text-gray-500">
                View by current status
              </p>
            </div>
          </div>

          {/* Right Side: Custom Select */}
          <div className="relative">
            <select onChange={(e) => handleFilter(e.target.value)} className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 outline-none transition-all hover:border-gray-300 hover:bg-gray-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:w-48 cursor-pointer">
              <option className="font-semibold" value="all">All Applications</option>
              <option className="font-semibold" value="pending">🟡 Pending</option>
              <option className="font-semibold" value="approved">🟢 Approved</option>
            </select>
            {/* Custom Dropdown Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
</div>


          <div className="max-w-6xl mx-auto space-y-6">
            {filteredApplications.map((u) => (
              <Application
                key={u.id}
                user={u}
                handleReject={handleReject}
                handleApprove={handleApprove}
              />
            ))}
          </div>
        </>
      )}

      {/* ================= COMPLAINTS ================= */}
      {activeTab === "complaints" && (
        <>
          <h1 className="text-3xl font-bold mb-8 text-orange-400 text-center">
            Hostel Complaints
          </h1>

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

          <div className="max-w-6xl mx-auto space-y-6">
            {filteredComplaints?.sort((a,b)=> b.priority-a.priority).map((c)=>(
              <ComplaintCard
                key={c.id}
                id={c.id}
                role={user?.role}
                userId={user?.id}
                studentName={c?.username}
                title={c.title}
                status={c.status}
                description={c.description}
                category={c.category}
                Complaint_date={c.date}
                upvoteCount={c.priority}
                // hasImage={false}
                // adminComment={c.adminComment}
                resolved_date={c.resolveDate}
                setChange={setChange}
                change={change}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default Admin;