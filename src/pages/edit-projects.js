import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function EditProjects() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <EditProjectsContent />}
    </BrowserOnly>
  );
}

function EditProjectsContent() {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tags: '',
    link: '',
    image: '',
  });
  const [projects, setProjects] = useState([]);
  const history = useHistory();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Check if the user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  }, [isAuthenticated, history]);

  // Fetch projects from localStorage or API
  const fetchProjects = () => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(storedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle other component logic here...

  return (
    <Layout title="Edit Projects">
      <h1>Edit Projects</h1>
      {/* The rest of your JSX here... */}
    </Layout>
  );
}
