import React, { useEffect, useState } from 'react';
import './ProjectPortfolio.css';

const ProjectPortfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Gagal mengambil data:', error));
  }, []);

  return (
    <div className="project-portfolio">
      <h1>Portofolio Proyek</h1>
      {projects.length === 0 ? (
        <p>Tidak ada proyek ditemukan.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectPortfolio;
