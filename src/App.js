import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import CreateUserForm from './pages/CreateUserForm';
import EditUser from './pages/EditUser';
import Modal from './pages/Modal';  // Import a new modal component
import "./App.css"

const App = () => {
  const [users, setUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const openEditModal = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setUserToEdit(null);
  };

  return (
    <div className="app">
      <Home users={users} openCreateModal={openCreateModal} openEditModal={openEditModal} deleteUser={deleteUser} />

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <Modal onClose={closeModal}>
          <CreateUserForm updateUsers={updateUsers} fetchUsers={fetchUsers} onClose={closeModal} />
        </Modal>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && userToEdit && (
        <Modal onClose={closeModal}>
          <EditUser user={userToEdit} users={users} updateUsers={updateUsers} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;
