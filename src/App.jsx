import { useEffect, useRef, useState } from "react";
import {
  FaDiscord,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaSpotify
} from "react-icons/fa";
import { SiDevpost } from "react-icons/si";

const sections = [
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "music", label: "Music" }
];

const skills = [
  {
    title: "Languages",
    color: "pink",
    items: [
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
    ]
  },
  {
    title: "Backend",
    color: "cyan",
    items: [
      { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "REST APIs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" }
    ]
  },
  {
    title: "Cloud & DevOps",
    color: "violet",
    items: [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "CI/CD", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" }
    ]
  },
  {
    title: "Databases",
    color: "amber",
    items: [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "SQL Server", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" }
    ]
  }
];

const experiences = [
  {
    role: "DevOps / Cloud Engineer",
    org: "Food Street Commentary WebApp",
    period: "Mar 2026 – Apr 2026",
    tag: "Cloud",
    tagColor: "violet",
    links: [{ label: "Live", href: "https://foodstreet.alixblu.site" }, { label: "GitHub", href: "https://github.com/akira3175/BuocChanSoiDa.git" }],
    points: [
      "Designed CI/CD pipelines for automated build and deployment workflows.",
      "Deployed AWS cloud stack with EC2, ECR, RDS, and Docker.",
      "Migrated full application from local to production cloud environment.",
      "Configured public domain access, networking, and service integrations."
    ]
  },
  {
    role: "Team Lead / Backend Developer",
    org: "Beauty Product Review Platform",
    period: "Oct 2025 – Dec 2025",
    tag: "Backend",
    tagColor: "cyan",
    links: [{ label: "GitHub", href: "https://github.com/alixblu/review-platform.git" }],
    points: [
      "Led backend architecture design and modular service task breakdown.",
      "Designed PostgreSQL and Neo4j schemas for product-social features.",
      "Developed REST APIs for auth, reviews, and user interaction modules.",
      "Integrated AWS Cognito, S3, and Bedrock-based RAG chatbot pipeline."
    ]
  }
];

const socialLinks = [
  { label: "Email", href: "mailto:alixblu3011@gmail.com", icon: FaEnvelope },
  { label: "GitHub", href: "https://github.com/alixblu", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/alixblu", icon: FaLinkedin },
  { label: "Devpost", href: "https://devpost.com/alixblu", icon: SiDevpost },
  { label: "Facebook", href: "https://www.facebook.com/phuonganhswifty/", icon: FaFacebook },
  { label: "Spotify", href: "https://open.spotify.com/user/31jozo7votaqhh4lp5oom2n2taxi", icon: FaSpotify }
];

export default function App() {
  const [active, setActive] = useState("profile");
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef({});
  const mainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { threshold: [0.2, 0.5], rootMargin: "-10% 0px -40% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setRef = (id) => (node) => { sectionRefs.current[id] = node; };

  return (
    <div className="rf-page" ref={mainRef}>
      {/* Background layers */}
      <div className="rf-bg" aria-hidden="true">
        <div className="rf-bg-grid" />
        <div className="rf-glow glow-pink" />
        <div className="rf-glow glow-cyan" />
        <div className="rf-glow glow-violet" />
        <div className="scanline" />
      </div>

      {/* Hero header */}
      <header className="rf-hero">
        <div className="rf-hero-inner">
          <div className="rf-hero-text">
            <p className="rf-eyebrow">
              <span className="eyebrow-dot" />
              alixblu.github.io
            </p>
            <h1 className="rf-name">

              <span className="name-accent">Phuong Anh Nguyen</span>
            </h1>
            <p className="rf-role">Software Engineering Student · Backend & Cloud</p>
            <p className="rf-bio">
              Based in Saigon · Backend systems · Cloud deployment · EDM/pop · TFT/FPS · 🐶
            </p>
            <div className="rf-social">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="rf-social-btn">
                  <Icon />
                  <span>{label}</span>
                </a>
              ))}
              <span className="rf-social-btn discord">
                <FaDiscord />
                <span>alixblu</span>
              </span>
            </div>
          </div>
          <div className="rf-hero-stats">
            <div className="rf-stat-card">
              <span className="rf-stat-val">Final-year</span>
              <span className="rf-stat-label">SE Student</span>
            </div>
            <div className="rf-stat-card">
              <span className="rf-stat-val">AWS CCP</span>
              <span className="rf-stat-label">Certified</span>
            </div>
            <div className="rf-stat-card">
              <span className="rf-stat-val">Backend</span>
              <span className="rf-stat-label">+ Cloud focus</span>
            </div>
            <div className="rf-stat-card">
              <span className="rf-stat-val">Saigon</span>
              <span className="rf-stat-label">Vietnam</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky sub-nav */}
      <nav className={`rf-nav${scrolled ? " rf-nav--scrolled" : ""}`}>
        <div className="rf-nav-inner">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className={`rf-nav-item${active === id ? " rf-nav-item--active" : ""}`}
            >
              <span className="rf-nav-dot" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="rf-main">
        {/* Profile */}
        <section id="profile" ref={setRef("profile")} className="rf-section">
          <h2 className="rf-section-heading reveal">Profile</h2>
          <div className="rf-profile-grid">
            <article className="rf-card rf-card--tall reveal">
              <div className="rf-card-label">About</div>
              <p>
                I'm actively seeking internship roles in backend, cloud, and platform engineering.
                I enjoy building scalable APIs, clean service architectures, and deploy-ready systems.
              </p>
              <p>
                Outside engineering I'm into EDM/pop music, live festivals, TFT and FPS games,
                and I'm an enthusiastic dog person.
              </p>
            </article>
            <article className="rf-card reveal">
              <div className="rf-card-label">Education</div>
              <p className="rf-card-title">BSc Information Technology</p>
              <p className="rf-muted">Software Engineering · Saigon University</p>
              <p className="rf-muted">Expected graduation: Feb 2027</p>
            </article>
            <article className="rf-card reveal">
              <div className="rf-card-label">Fast Contact</div>
              <div className="rf-contact-list">
                <a href="mailto:alixblu3011@gmail.com" className="rf-contact-row">
                  <FaEnvelope /> alixblu3011@gmail.com
                </a>
                <span className="rf-contact-row discord">
                  <FaDiscord /> Discord: alixblu
                </span>
                <a href="https://github.com/alixblu" target="_blank" rel="noreferrer" className="rf-contact-row">
                  <FaGithub /> github.com/alixblu
                </a>
                <a href="https://linkedin.com/in/alixblu" target="_blank" rel="noreferrer" className="rf-contact-row">
                  <FaLinkedin /> linkedin.com/in/alixblu
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" ref={setRef("skills")} className="rf-section">
          <h2 className="rf-section-heading reveal">Skills & Certifications</h2>
          <div className="rf-skills-grid">
            {skills.map((group) => (
              <article key={group.title} className={`rf-card rf-card--skill rf-card--${group.color} reveal`}>
                <div className="rf-card-label">{group.title}</div>
                <div className="rf-chips">
                  {group.items.map((item) => (
                    <span key={item.name} className="rf-chip">
                      <img src={item.logo} alt={item.name} />
                      {item.name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
            <article className="rf-card rf-card--cert reveal">
              <div className="rf-card-label">Certification</div>
              <div className="rf-cert-badge">☁</div>
              <p className="rf-card-title">AWS Certified Cloud Practitioner</p>
              <p className="rf-muted">Amazon Web Services · Jul 2025</p>
            </article>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" ref={setRef("experience")} className="rf-section">
          <h2 className="rf-section-heading reveal">Experience & Activities</h2>
          <div className="rf-exp-grid">
            <div className="rf-timeline">
              {experiences.map((job) => (
                <article key={job.role} className="rf-timeline-item reveal">
                  <div className="rf-timeline-connector">
                    <div className="rf-timeline-node" />
                    <div className="rf-timeline-line" />
                  </div>
                  <div className="rf-timeline-body">
                    <div className="rf-timeline-header">
                      <span className={`rf-tag rf-tag--${job.tagColor}`}>{job.tag}</span>
                      <span className="rf-period">{job.period}</span>
                    </div>
                    <h3 className="rf-timeline-role">{job.role}</h3>
                    <p className="rf-muted">{job.org}</p>
                    <ul className="rf-timeline-points">
                      {job.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <div className="rf-timeline-links">
                      {job.links.map((l) => (
                        <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="rf-link-pill">
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="rf-activities">
              <article className="rf-card reveal">
                <div className="rf-card-label">Community</div>
                <p className="rf-card-title">AWS Cloud Club SGU</p>
                <p className="rf-muted">Core Team Member, Club President</p>
                <p className="rf-muted">Nov 2025 – Present</p>
                <p>Organized AWS workshops, tech talks, and cloud learning tracks for student developers.</p>
              </article>
              <article className="rf-card reveal">
                <div className="rf-card-label">Hackathons</div>
                <p className="rf-card-title">LotusHacks · Qwen AI Build Day</p>
                <p className="rf-muted">Mar 2026 – Present</p>
                <p>Enterprise and international hackathons focused on software and AI problem-solving.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Music */}
        <section id="music" ref={setRef("music")} className="rf-section">
          <h2 className="rf-section-heading reveal">Now Playing</h2>
          <div className="rf-music-grid">
            <article className="rf-music-console reveal">
              <div className="rf-console-header">
                <div className="rf-console-dots">
                  <span /><span /><span />
                </div>
                <span className="rf-console-title">spotify_player.exe</span>
              </div>
              <div className="rf-console-body">
                <div className="rf-album-art" />
                <div className="rf-track-info">
                  <p className="rf-track-label">NOW PLAYING</p>
                  <h3 className="rf-track-name">EDM + Pop Coding Session</h3>
                  <p className="rf-track-artist">alixblu</p>
                  <div className="rf-progress">
                    <div className="rf-progress-bar" />
                  </div>
                  <div className="rf-eq">
                    <span /><span /><span /><span /><span /><span /><span />
                  </div>
                </div>
              </div>
              <a
                href="https://open.spotify.com/user/31jozo7votaqhh4lp5oom2n2taxi"
                target="_blank"
                rel="noreferrer"
                className="rf-spotify-btn"
              >
                <FaSpotify /> Open Spotify Profile
              </a>
            </article>
            <div className="rf-music-side">
              <article className="rf-card reveal">
                <div className="rf-card-label">Taste</div>
                <p>EDM and Pop — the soundtrack to every coding session, late-night push, and festival crowd.</p>
              </article>
              <article className="rf-card reveal">
                <div className="rf-card-label">Lifestyle</div>
                <p>Attends EDM festivals · Plays TFT and FPS games · Dog person 🐶</p>
              </article>
              <article className="rf-card reveal">
                <div className="rf-card-label">Find Me</div>
                <div className="rf-contact-list">
                  <a href="https://www.facebook.com/phuonganhswifty/" target="_blank" rel="noreferrer" className="rf-contact-row">
                    <FaFacebook /> facebook.com/phuonganhswifty
                  </a>
                  <a href="https://open.spotify.com/user/31jozo7votaqhh4lp5oom2n2taxi" target="_blank" rel="noreferrer" className="rf-contact-row">
                    <FaSpotify /> Spotify
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="rf-footer">
        <p>© 2026 Nguyen Thi Phuong Anh · alixblu</p>
        <p className="rf-updated">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      </footer>
    </div>
  );
}
