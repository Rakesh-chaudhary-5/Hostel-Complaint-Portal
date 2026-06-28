
export default function Application ({user,handleReject,handleApprove}) {
      
  return (
    <div
            key={user.id}
            className="bg-white shadow-lg rounded-xl p-6 border"
          >

            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Application ID: {user.id}
              </h2>
              <span className={`${user.verified == false ? "bg-red-600 text-white" : "bg-green-600 text-white"} px-3 py-1 rounded-full text-sm font-medium`}>
                {user.verified == false ? "PENDING" : "APPROVED"}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-4 gap-6 text-gray-700">

              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.username}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              {/* <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="font-medium">{user.mobileNumber}</p>
              </div> */}

              {/* <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{user.department}</p>
              </div> */}

              <div>
                <p className="text-sm text-gray-500">ID Card Number</p>
                <p className="font-medium">{user.idCardNumber}</p>
              </div>

              {/* <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{user.birthDate}</p>
              </div> */}

              {/* <div>
                <p className="text-sm text-gray-500">Room Number</p>
                <p className="font-medium">{user.roomNo}</p>
              </div> */}

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">

            {
              user.verified != false
              ? <button
                onClick={() => handleReject(user.id)}
                className="px-5 cursor-pointer py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
              >
                Reject
              </button>
              : ""
            }
            {
              user.verified != true
              ?
              <button
                onClick={() => handleApprove(user.id)}
                className="px-5 cursor-pointer py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
              >
                Approve
              </button>
              : ''
            }

            </div>

          </div>
  )
}
