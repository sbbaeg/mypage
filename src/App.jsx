import React, { useState, useEffect } from 'react';
import ProjectCard from './components/ProjectCard';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 우리 프로젝트 내부의 API(/api/projects)를 호출합니다.
        const response = await fetch('/api/projects');
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to fetch projects.');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <h1>My Vercel Projects</h1>
      <p>These projects are automatically fetched from the Vercel API.</p>
      
      {loading && <p>Loading projects...</p>}
      
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div className="projects-container">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;