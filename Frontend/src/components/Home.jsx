import { useContext, useState } from "react";
import MSU from "../img/msu.jpg";
import { Link } from "react-router-dom";
import { MyContext } from "../Context/userContext";

function Home() {
  const {user} = useContext(MyContext);
  console.log(user);

  return (
    <div id="/" className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
      
      {/* HERO SECTION - Focus on Problem Solving */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background - A cleaner, more architectural/tech look */}
        <div 
          className="absolute w-full inset-0  z-0 transform scale-105"
        ><img src={MSU}   className="absolute inset-0 w-full h-full object-cover" alt="msu" /></div>
        {/* Darker overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-indigo-900/80 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <div className="inline-block">
            <span className="bg-indigo-500/20 text-indigo-100 py-2 px-6 rounded-full text-sm font-semibold border border-indigo-400/30 backdrop-blur-sm tracking-wide">
              🔧 Official Hostel Complaint Portal
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-2xl">
            Spot an Issue? <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              We'll Fix It.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            From broken fans to wifi glitches—report your hostel grievances in seconds and track them in real-time.
          </p>
            { !user?
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
           <Link
              to="/login"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-indigo-600/40 flex items-center justify-center gap-3"
            >
              <span>Login to Complain</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md border border-white/20 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <span>Create Account</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            </Link>
          </div>
            : <h2
              className="px-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-700 py-4 text-5xl font-semibold flex items-center justify-center "
            >
              <span><span className="text-5xl">Welcome</span> <span className="text-white">{user.username},</span> <br /> <span className="text-4xl">in Hostel Complaint Portal</span></span>
            </h2> }
        </div>
      </section>


      {/* SYSTEM FEATURES - Why use this website? */}
      <section className="py-20 px-6 md:px-20 bg-white" id="features">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Use The Portal?</h2>
                <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
                   Gone are the days of finding the warden to write in a register. We've digitized the process for speed and accountability.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="p-8 rounded-3xl bg-blue-50 hover:bg-blue-100 transition duration-300 border border-blue-100">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-lg shadow-blue-600/20">
                        📱
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Digital Tracking</h3>
                    <p className="text-gray-600">
                        No more "I forgot." Once you submit a complaint, it's logged in the system and tracked until it's marked 'Resolved'.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="p-8 rounded-3xl bg-purple-50 hover:bg-purple-100 transition duration-300 border border-purple-100">
                    <div className="w-14 h-14 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-lg shadow-purple-600/20">
                        🔔
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Live Status Updates</h3>
                    <p className="text-gray-600">
                        See exactly where your request is. <span className="font-semibold text-purple-700">Pending</span> → <span className="font-semibold text-purple-700">In Progress</span> → <span className="font-semibold text-purple-700">Resolved</span>.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="p-8 rounded-3xl bg-amber-50 hover:bg-amber-100 transition duration-300 border border-amber-100">
                    <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-lg shadow-amber-500/20">
                        ⚖️
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Transparency</h3>
                    <p className="text-gray-600">
                        Direct communication with the administration. Admins can see delays and ensure wardens take action quickly.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="process"  className="py-20 px-6 md:px-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-600 blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-600 blur-3xl opacity-20"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Resolution in 3 Simple Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Step 1 */}
             <div className="text-center relative">
                <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center border-4 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] mb-6 text-3xl">
                    📝
                </div>
                <h3 className="text-xl font-bold mb-2">1. Log the Issue</h3>
                <p className="text-gray-400">Login and fill out a simple form detailing the problem (Electrical, Plumbing, Mess, etc).</p>
             </div>


             {/* Step 2 */}
             <div className="text-center relative">
                <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center border-4 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] mb-6 text-3xl">
                    ⚙️
                </div>
                <h3 className="text-xl font-bold mb-2">2. Processing</h3>
                <p className="text-gray-400">The warden assigns the task to the electrician or cleaning staff immediately.</p>
             </div>


             {/* Step 3 */}
             <div className="text-center relative">
                <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center border-4 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] mb-6 text-3xl">
                    ✅
                </div>
                <h3 className="text-xl font-bold mb-2">3. Problem Solved</h3>
                <p className="text-gray-400">You get notified once the work is done. You can verify and close the ticket.</p>
             </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Hostel<span className="text-indigo-600">Assist</span></h2>
                <p className="text-gray-500 text-sm">Official Complaint Portal</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-600">
                <Link to="/login" className="hover:text-indigo-600 transition">Student Login</Link>
                <Link to="/contact" className="hover:text-indigo-600 transition">Emergency Contacts</Link>
            </div>

            <p className="text-gray-400 text-sm">
                © 2026 Campus Management.
            </p>
        </div>
      </footer>

    </div>
  );
}

export default Home;