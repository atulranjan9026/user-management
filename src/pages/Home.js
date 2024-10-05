import React, { useState } from 'react';

const Home = ({ users, openCreateModal, openEditModal, deleteUser }) => {
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleDelete = (userId, userName) => {
    deleteUser(userId);
    setDeleteMessage(`${userName} has been deleted.`);
    setTimeout(() => setDeleteMessage(''), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        onClick={openCreateModal}
      >
        Create New User
      </button>

      {deleteMessage && (
        <p className="text-red-500 mt-4">{deleteMessage}</p>
      )}

      <ul className="mt-4 space-y-4">
        {users.map((user) => (
          <li key={user.id} className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">Name: {user.name}</p>
              <p className="text-gray-500">Email: {user.email}</p>
              <p className="text-gray-500">Phone No: {user.phone}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition-colors"
                onClick={() => openEditModal(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
                onClick={() => handleDelete(user.id, user.name)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
