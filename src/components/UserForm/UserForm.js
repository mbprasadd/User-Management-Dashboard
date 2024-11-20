import React, { useState, useEffect } from "react";

import './UserForm.css';

const UserForm = ({ onAdd, onUpdate, editingUser, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: { name: "" },
  });

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({
        name: "",
        email: "",
        company: { name: "" },
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      setFormData({ ...formData, company: { name: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="company"
        placeholder="Department"
        value={formData.company.name}
        onChange={handleChange}
        required
      />
      <button className="submit-button" type="submit">{editingUser ? "Update" : "Add"} User</button>
      {editingUser && <button onClick={onCancelEdit}>Cancel</button>}
    </form>
  );
};

export default UserForm;