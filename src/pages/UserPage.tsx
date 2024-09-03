function UserPage() {
  return (
    <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md w-72">
      <div className="flex items-center p-6">
        <img
          className="object-cover w-16 h-16 rounded-full"
          src="https://via.placeholder.com/150"
          alt="User avatar"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-900">UserNickname</h2>
          <p className="text-sm text-gray-600">Member</p>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
