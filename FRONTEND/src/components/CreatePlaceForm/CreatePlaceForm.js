import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './CreatePlaceForm.css';

const CreatePlaceForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleImageChange = (e) => {
    setPhoto(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
        setMessage("Please upload a photo.");
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (photo) {
      formData.append('photo', photo); 
    }

    try {
      const response = await axios.post('http://35.171.43.245:3004/api/space/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', 
        }
      });
      setMessage(response.data.message);
      navigate('/main'); 
    } catch (error) {
      console.error('Error creating space:', error);
      setMessage('Error creating space');
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Create a New Space</h2>
      <form id="formCreatePlace" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            required
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Enter the name of the space</label>
        </div>

        <div className="form-control">
          <textarea
            required
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Enter a description of the space</label>
        </div>

        <div className="form-control">
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit">Create Space</button>
        <button onClick={() => navigate('/main')}>Cancel</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePlaceForm;
