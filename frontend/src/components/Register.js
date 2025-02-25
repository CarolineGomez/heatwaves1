import axios from 'axios';
import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    healthConditions: '',
    city: '',
    susceptibleToHeatIllness: false,
  });

  const [message, setMessage] = useState(null);  // For user feedback

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      setMessage('User registered successfully');
      setFormData({
        email: '',
        password: '',
        name: '',
        age: '',
        healthConditions: '',
        city: '',
        susceptibleToHeatIllness: false,
      });  // Reset form on successful submission
    } catch (error) {
      console.error('Registration Error:', error);
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" />
      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" />
      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
      <input type="text" name="healthConditions" value={formData.healthConditions} onChange={handleChange} placeholder="Health Conditions" />
      <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="City" />
      <label>
        Susceptible to heat-related illnesses:
        <input type="checkbox" name="susceptibleToHeatIllness" checked={formData.susceptibleToHeatIllness} onChange={handleChange} />
      </label>
      <button type="submit">Register</button>
      {message && <p>{message}</p>}  {/* Display feedback message */}
    </form>
  );
}

export default Register;
