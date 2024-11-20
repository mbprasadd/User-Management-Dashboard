import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList/UserList.js";
import UserForm from "./components/UserForm/UserForm.js";

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetching users data from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );
      setUsers([...users, { ...response.data, id: users.length+1 }]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      );
      setUsers(
        users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="App">
    <h1 className="main-heading">User Management Dashboard</h1>
      <UserForm
        onAdd={addUser}
        onUpdate={updateUser}
        editingUser={editingUser}
        onCancelEdit={() => setEditingUser(null)}
      />
      <UserList
        users={users}
        onEdit={setEditingUser}
        onDelete={deleteUser}
      />
    </div>
  );
};

export default App;
