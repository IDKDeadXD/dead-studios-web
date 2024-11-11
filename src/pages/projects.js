import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import ProjectCard from '../components/projectCard';
import './projects.css'; // Import the CSS file

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(storedProjects);
  }, []);

  return (
    <Layout title="Projects">
      <div className="projects-container">
        <h1>Projects</h1>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </Layout>
  );
}
