import React from 'react';

function ProjectCard({ project }) {
  if (!project.url) {
    return (
      <div className="card disabled">
        <h3>{project.name}</h3>
        <p>No deployment URL available</p>
        <small>Framework: {project.framework}</small>
      </div>
    );
  }

  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="card">
      <h3>{project.name}</h3>
      <p>Visit Deployment &rarr;</p>
      <small>Framework: {project.framework}</small>
    </a>
  );
}

export default ProjectCard;
