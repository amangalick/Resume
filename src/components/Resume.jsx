import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchExperience, fetchEducation, fetchSkills, fetchProjects, fetchCertifications } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const OPEN_TO_WORK = true; // set to false to hide the badge

function calcDuration(startDate, endDate) {
  if (!startDate) return '';
  const parseDate = (s) => {
    if (!s || s === 'Present') return new Date();
    const [mon, yr] = s.split(' ');
    return new Date(parseInt(yr), MONTHS.indexOf(mon));
  };
  const total = (end, start) =>
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const months = total(parseDate(endDate), parseDate(startDate));
  if (months <= 0) return '';
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  if (yrs === 0) return `${mos} mo${mos !== 1 ? 's' : ''}`;
  if (mos === 0) return `${yrs} yr${yrs !== 1 ? 's' : ''}`;
  return `${yrs} yr${yrs !== 1 ? 's' : ''} ${mos} mo${mos !== 1 ? 's' : ''}`;
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line w-20" />
      <div className="skeleton-line w-50" />
      <div className="skeleton-line w-35" />
      <div className="skeleton-line w-80" />
      <div className="skeleton-line w-70" />
      <div className="skeleton-line w-75" />
    </div>
  );
}

export default function Resume() {
  const [items, setItems] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [index, setIndex] = useState(0);
  const [isRecruiterMode, setMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('experience');
  const [skillFilter, setSkillFilter] = useState(null);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const touchStartX = useRef(null);

  useEffect(() => {
    Promise.all([fetchExperience(), fetchEducation(), fetchSkills(), fetchProjects(), fetchCertifications()])
      .then(([exp, edu, skl, proj, certs]) => {
        setItems(exp);
        setEducation(edu);
        setSkills(skl);
        setProjects(proj);
        setCertifications(certs);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (isRecruiterMode) return;
      if (e.key === 'ArrowRight') setIndex(i => Math.min(i + 1, items.length - 1));
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isRecruiterMode, items.length]);

  // Active section tracking on scroll
  useEffect(() => {
    if (loading) return;
    const sectionIds = ['experience', 'education', 'skills', 'projects', 'certifications'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const copyEmail = () => {
    navigator.clipboard.writeText('ahnika.mangalick@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const prev = isRecruiterMode;
    if (!isRecruiterMode) setMode(true);
    setTimeout(() => {
      window.print();
      if (!prev) setMode(false);
    }, 150);
  };

  // Swipe handlers for story mode
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) setIndex(i => Math.min(i + 1, items.length - 1));
      if (delta > 0) setIndex(i => Math.max(i - 1, 0));
    }
    touchStartX.current = null;
  };

  const dateRange = (item) => {
    const range = `${item.startDate} – ${item.endDate}`;
    const dur = calcDuration(item.startDate, item.endDate);
    return dur ? `${range} · ${dur}` : range;
  };

  const toggleSkillFilter = (skill) => {
    setSkillFilter(prev => prev === skill ? null : skill);
  };

  const projectMatchesFilter = (proj) => {
    if (!skillFilter) return null;
    return Array.isArray(proj.tech) &&
      proj.tech.some(t => t.toLowerCase() === skillFilter.toLowerCase());
  };

  const navSections = [
    { id: 'experience', label: 'Experience', show: items.length > 0 },
    { id: 'education', label: 'Education', show: education.length > 0 },
    { id: 'skills', label: 'Skills', show: skills.length > 0 },
    { id: 'projects', label: 'Projects', show: projects.length > 0 },
    { id: 'certifications', label: 'Certs', show: certifications.length > 0 },
  ];

  return (
    <div className="resume-container">

      {/* HERO */}
      <section className="hero">
        <div className="hero-top">
          <h1>Ahnika Mangalick</h1>
          {OPEN_TO_WORK && <span className="open-to-work-badge">Open to Work</span>}
        </div>
        <p className="hero-subtitle">B.S. Computer Science & Mathematics · Palo Alto, CA</p>
        <p className="hero-bio">
          <strong>CS &amp; Math grad comfortable using AI/Agents from design to code.</strong> I love building software 
          that solves real problems and explaining it clearly. I thrive in diverse, collaborative teams — equally 
          comfortable deep in a codebase, leveraging AI tools to accelerate development, or translating technical 
          work for non-technical stakeholders. Looking for roles where engineering, AI-augmented workflows, and 
          communication all matter.
        </p>
        <div className="hero-links">
          <span className="email-wrap">
            <a href="mailto:ahnika.mangalick@gmail.com" className="email-print-link">ahnika.mangalick@gmail.com</a>
            <button className="copy-btn" onClick={copyEmail}>
              {copied ? 'Copied!' : 'Email'}
            </button>
          </span>
          <a href="https://www.linkedin.com/in/ahnika-mangalick-792756261/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/amangalick" target="_blank" rel="noreferrer">GitHub</a>
          <button className="print-btn no-print" onClick={handlePrint}>Print / Save PDF</button>
        </div>
      </section>

      {/* STICKY NAV */}
      {!loading && (
        <nav className="sticky-nav no-print">
          {navSections.filter(s => s.show).map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={activeSection === s.id ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {s.label}
            </a>
          ))}
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </nav>
      )}

      {/* EXPERIENCE */}
      <section id="experience" className="resume-section">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          {!loading && (
            <button className="no-print" onClick={() => { setMode(!isRecruiterMode); setIndex(0); }}>
              {isRecruiterMode ? 'Story Mode' : 'Recruiter Mode'}
            </button>
          )}
        </div>

        {loading ? (
          <SkeletonCard />
        ) : items.length === 0 ? (
          <p style={{color: '#888', fontSize: '0.9em'}}>No experience data found. Make sure your Firestore documents have an <code>order</code> field.</p>
        ) : isRecruiterMode ? (
          <div className="list-view">
            {items.map(item => (
              <div key={item.id} className="resume-item">
                <h3>{item.role} @ {item.company}</h3>
                <p className="resume-item-dates">{dateRange(item)}</p>
                <p>{item.description.join(' ')}</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="story-view"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="progress">{index + 1} / {items.length}</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={items[index].id}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="card"
              >
                <h2 className="card-dates">{dateRange(items[index])}</h2>
                <h3>{items[index].role}</h3>
                <h4>{items[index].company}</h4>
                <ul>
                  {items[index].description.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="nav-buttons no-print">
              <button disabled={index === 0} onClick={() => setIndex(index - 1)}>Previous</button>
              <button disabled={index === items.length - 1} onClick={() => setIndex(index + 1)}>Next</button>
            </div>
            <p className="nav-hint no-print">or use ← → arrow keys · swipe on mobile</p>
          </div>
        )}
      </section>

      {/* EDUCATION */}
      {!loading && education.length > 0 && (
        <section id="education" className="resume-section">
          <h2 className="section-title">Education</h2>
          <div className="list-view">
            {education.map(edu => (
              <div key={edu.id} className="resume-item">
                <h3>{edu.degree} in {edu.field}</h3>
                <p className="resume-item-dates">{edu.school} · {edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {!loading && skills.length > 0 && (
        <section id="skills" className="resume-section">
          <div className="section-header">
            <h2 className="section-title">Skills</h2>
            {skillFilter && (
              <button className="filter-clear no-print" onClick={() => setSkillFilter(null)}>
                Clear filter
              </button>
            )}
          </div>
          {skillFilter && (
            <p className="filter-hint no-print">
              Showing projects that use <strong>{skillFilter}</strong>
            </p>
          )}
          <div className="skills-grid">
            {skills.map(skill => (
              <div key={skill.id} className="skill-category">
                <h4>{skill.category}</h4>
                <div className="skill-tags">
                  {skill.items.map((s, i) => (
                    <span
                      key={i}
                      className={`skill-tag clickable${skillFilter === s ? ' active' : ''}`}
                      onClick={() => toggleSkillFilter(s)}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {!loading && projects.length > 0 && (
        <section id="projects" className="resume-section">
          <h2 className="section-title">Projects</h2>
          <div className="list-view">
            {projects.map(proj => {
              const match = projectMatchesFilter(proj);
              const dimClass = match === false ? ' skill-dim' : match === true ? ' skill-match' : '';
              return (
                <div key={proj.id} className={`resume-item${dimClass}`}>
                  <div className="resume-item-header">
                    <h3>{proj.name}</h3>
                    {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="item-link">View →</a>}
                  </div>
                  {proj.tech && Array.isArray(proj.tech) && proj.tech.length > 0 && (
                    <div className="skill-tags" style={{margin: '0.4rem 0 0.5rem'}}>
                      {proj.tech.map((t, i) => <span key={i} className="skill-tag">{t}</span>)}
                    </div>
                  )}
                  <p>{proj.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {!loading && certifications.length > 0 && (
        <section id="certifications" className="resume-section">
          <h2 className="section-title">Certifications</h2>
          <div className="list-view">
            {certifications.map(cert => (
              <div key={cert.id} className="resume-item">
                <div className="resume-item-header">
                  <h3>{cert.name}</h3>
                  {cert.link && <a href={cert.link} target="_blank" rel="noreferrer" className="item-link">Verify →</a>}
                </div>
                <p className="resume-item-dates">{cert.issuer} · {cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <p>Ahnika Mangalick</p>
        <p>B.S. Computer Science & Mathematics</p>
        <p className="footer-links no-print">
          <Link to="/privacy" style={{ marginRight: '1rem' }}>Privacy Policy</Link>
        </p>
      </footer>

    </div>
  );
}
