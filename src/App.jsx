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
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1>나의 개발 블로그</h1>
          <nav>
            <ul>
              <li><a href="#">홈</a></li>
              <li><a href="#">프로젝트</a></li>
              <li><a href="#">소개</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section className="intro-section">
          <h2>환영합니다!</h2>
          <p>이곳은 제가 Vercel을 통해 배포한 다양한 프로젝트들을 모아둔 개인 포트폴리오 페이지입니다. 새로운 프로젝트가 배포될 때마다 자동으로 업데이트됩니다.</p>
        </section>

        <section className="projects-section">
          <h2>내 프로젝트들</h2>
          {loading && <p>프로젝트를 불러오는 중...</p>}

          {error && <p className="error">오류: {error}</p>}

          {!loading && !error && (
            <div className="projects-container">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} 나의 개발 블로그. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}

export default App;
