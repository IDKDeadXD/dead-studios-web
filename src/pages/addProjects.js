import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './addProjects.css'; // Assuming your CSS is here

export default function AddProjects() {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    downloadLink: '',
    image: '',
    tags: '',
    author: '',
  });

  const history = useHistory();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject({
          ...newProject,
          image: reader.result, // Save the base64 image data
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Add the new project to the list
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const tagsArray = newProject.tags.split(',').map((tag) => tag.trim());
    storedProjects.push({ ...newProject, tags: tagsArray });
    localStorage.setItem('projects', JSON.stringify(storedProjects));

    // Redirect to the Projects page
    history.push('/projects');
  };

  return (
    <div className="add-projects-container">
      <h1>Add New Project</h1>
      <input
        type="text"
        placeholder="Title"
        value={newProject.title}
        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProject.description}
        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Download Link"
        value={newProject.downloadLink}
        onChange={(e) => setNewProject({ ...newProject, downloadLink: e.target.value })}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={newProject.tags}
        onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author"
        value={newProject.author}
        onChange={(e) => setNewProject({ ...newProject, author: e.target.value })}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {newProject.image && (
        <div>
          <h3>Preview:</h3>
          <img src={newProject.image} alt="Project Preview" className="preview-image" />
        </div>
      )}
      <button onClick={handleSubmit}>Add Project</button>
    </div>
  );
}
