function LogoutButton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        className="w-32 h-32 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;