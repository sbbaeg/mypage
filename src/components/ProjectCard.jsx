
import React from 'react';

// 각 프로젝트의 정보를 받아 카드 형태로 표시하는 컴포넌트
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
