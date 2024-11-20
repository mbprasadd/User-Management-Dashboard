import React from "react";
import "./UserList.css";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="user-list">
      <h2>User's List</h2>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                {/* //First Name */}
                <td>{user.name.split(" ")[0]}</td>
                {/* Last Name */}
                <td>{user.name.split(" ")[1]}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>
                  <button
                    className="edit"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available. Please add some users.</p>
      )}
    </div>
  );
};

export default UserList;
