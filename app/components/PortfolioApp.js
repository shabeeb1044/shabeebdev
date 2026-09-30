"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  about,
  aboutFocus,
  education,
  experience,
  filters,
  profile,
  projectCovers,
  projects,
  services,
  skillTags,
  skills,
  stats,
  tools,
  workApproach,
} from "../data/profile";
import { blogs } from "../data/blogs";
import { seoFaq } from "../data/seo";
import IonIcon from "./IonIcon";
import ToolIcon from "./ToolIcon";

const pages = [
  { name: "About", icon: "person-outline" },
  { name: "Resume", icon: "document-text-outline" },
  { name: "Portfolio", icon: "images-outline" },
  { name: "Blog", icon: "newspaper-outline" },
  { name: "Contact", icon: "mail-outline" },
];

function ExperienceList() {
  return (
    <ol className="timeline-list">
      {experience.map((item) => (
        <li className="timeline-item" key={`${item.company}-${item.role}`}>
          <h4 className="h4 timeline-item-title">{item.role}</h4>
          <p className="timeline-company">{item.company}</p>
          <span>{item.period}</span>
          <p className="timeline-text">{item.text}</p>
          {item.highlights?.length ? (
            <ul className="timeline-highlights">
              {item.highlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function EducationList() {
  return (
    <ol className="timeline-list">
      {education.map((item) => (
        <li className="timeline-item" key={item.title}>
          <h4 className="h4 timeline-item-title">{item.title}</h4>
          <span>{item.period}</span>
          <p className="timeline-text">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

function SkillsPanel() {
  return (
    <>
      <ul className="skills-list content-card">
        {skills.map((skill) => (
          <li className="skills-item" key={skill.name}>
            <div className="title-wrapper">
              <h5 className="h5">{skill.name}</h5>
              <data value={skill.value}>{skill.value}%</data>
            </div>
            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: `${skill.value}%` }}></div>
            </div>
          </li>
        ))}
      </ul>
      <div className="skill-tags">
        {skillTags.map((tag) => (
          <span className="skill-tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}

function PortfolioAppInner() {
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState("about");
  const [filter, setFilter] = useState("all");
  const [filterLabel, setFilterLabel] = useState("All");
  const [selectOpen, setSelectOpen] = useState(false);
  const [canSend, setCanSend] = useState(false);
  const [sending, setSending] = useState(false);
  const [formNote, setFormNote] = useState("");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current);
  }, []);

  useEffect(() => {
    const requested = (searchParams.get("page") || "").toLowerCase();
    if (pages.some((item) => item.name.toLowerCase() === requested)) {
      setPage(requested);
    }
  }, [searchParams]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  function openPage(name) {
    setPage(name.toLowerCase());
    window.scrollTo(0, 0);
  }

  function applyFilter(label) {
    setFilter(label.toLowerCase());
    setFilterLabel(label);
    setSelectOpen(false);
  }

  function onFormInput(event) {
    setCanSend(event.currentTarget.form.checkValidity());
    setFormNote("");
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (sending || !form.checkValidity()) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setFormNote("Something went wrong. Please try again.");
      return;
    }

    const data = new FormData(form);
    const fullname = String(data.get("fullname") || "").trim();
    data.set("access_key", accessKey);
    data.set("name", fullname);
    data.set("subject", `Portfolio message from ${fullname}`);
    setSending(true);
    setFormNote("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        setFormNote("Something went wrong. Please try again.");
        return;
      }

      form.reset();
      setCanSend(false);
      setFormNote("Thank you! Your message has been submitted successfully.");
    } catch {
      setFormNote("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <aside className={`sidebar${sidebarOpen ? " active" : ""}`}>
        <div className="sidebar-info">
          <figure className="avatar-box">
            <img
              src={profile.avatar}
              alt={profile.name}
              width={150}
              height={150}
            />
          </figure>

          <div className="info-content">
            <h1 className="name" title={profile.name}>
              {profile.name}
            </h1>
            <p className="title">{profile.title}</p>
          </div>

          <button
            className="info-more-btn"
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-expanded={sidebarOpen}
            aria-controls="sidebar-contacts"
            aria-label={sidebarOpen ? "Hide contacts" : "Show contacts"}
          >
            <span className="info-more-label">{sidebarOpen ? "Hide Contacts" : "Show Contacts"}</span>
            <svg className="info-more-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 9.5 12 15.5 18 9.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="sidebar-info-more" id="sidebar-contacts">
          <div className="separator"></div>

          <ul className="contacts-list">
            <li className="contact-item">
              <div className="icon-box">
                <IonIcon name="mail-outline" />
              </div>
              <div className="contact-info">
                <p className="contact-title">Email</p>
                <a href={`mailto:${profile.email}`} className="contact-link">
                  {profile.email}
                </a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <IonIcon name="phone-portrait-outline" />
              </div>
              <div className="contact-info">
                <p className="contact-title">Phone</p>
                <a href={profile.phoneHref} className="contact-link">
                  {profile.phone}
                </a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <IonIcon name="location-outline" />
              </div>
              <div className="contact-info">
                <p className="contact-title">Location</p>
                <address>{profile.location}</address>
              </div>
            </li>
          </ul>

          <div className="separator"></div>

          <ul className="social-list">
            <li className="social-item">
              <a
                href={profile.github}
                className="social-link"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <IonIcon name="logo-github" />
              </a>
            </li>
            <li className="social-item">
              <a
                href={profile.linkedin}
                className="social-link"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <IonIcon name="logo-linkedin" />
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="main-content">
        <nav className="navbar" aria-label="Primary">
          <ul className="navbar-list">
            {pages.map(({ name, icon }) => (
              <li className="navbar-item" key={name}>
                <button
                  className={`navbar-link${page === name.toLowerCase() ? " active" : ""}`}
                  type="button"
                  onClick={() => openPage(name)}
                  aria-current={page === name.toLowerCase() ? "page" : undefined}
                >
                  <IonIcon name={icon} aria-hidden="true" />
                  <span className="navbar-label">{name}</span>
                </button>
              </li>
            ))}
            <li className="navbar-item navbar-item-theme">
              <button
                className="navbar-link theme-toggle"
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                title={theme === "dark" ? "Light mode" : "Dark mode"}
              >
                <IonIcon name={theme === "dark" ? "sunny-outline" : "moon-outline"} />
              </button>
            </li>
          </ul>
        </nav>

        <article className={`about${page === "about" ? " active" : ""}`}>
          <header>
            <h2 className="h2 article-title">About me</h2>
          </header>

          <section className="about-text reveal">
            <ul className="about-focus" aria-label="Main focus">
              {aboutFocus.map((item) => (
                <li className="about-focus-item" key={item.label}>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="about-stats reveal">
            <ul className="stats-list">
              {stats.map((stat) => (
                <li className="stats-item" key={stat.label}>
                  <div className="icon-box">
                    <IonIcon name={stat.icon} />
                  </div>
                  <div className="stats-content">
                    <h4 className="h4 stats-value">{stat.value}</h4>
                    <p className="stats-label">{stat.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="timeline about-block reveal">
            <div className="title-wrapper">
              <div className="icon-box">
                <IonIcon name="briefcase-outline" />
              </div>
              <h3 className="h3">Experience</h3>
            </div>
            <ExperienceList />
          </section>

          <section className="skill about-block reveal">
            <h3 className="h3 skills-title">Skills</h3>
            <SkillsPanel />
          </section>

          <section className="about-approach about-block reveal">
            <h3 className="h3 service-title">How I work</h3>
            <ul className="about-approach-list">
              {workApproach.map((item) => (
                <li className="about-approach-item" key={item.title}>
                  <h4 className="h4">{item.title}</h4>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="timeline about-block reveal">
            <div className="title-wrapper">
              <div className="icon-box">
                <IonIcon name="book-outline" />
              </div>
              <h3 className="h3">Education</h3>
            </div>
            <EducationList />
          </section>

          <section className="service reveal">
            <h3 className="h3 service-title">What I&apos;m doing</h3>
            <ul className="service-list">
              {services.map((service) => (
                <li
                  className={`service-item${service.main ? " is-main" : ""}`}
                  key={service.title}
                >
                  <div className="service-icon-box">
                    <IonIcon name={service.icon} />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">{service.title}</h4>
                    <p className="service-item-text">{service.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="clients tools-section reveal" id="tools">
            <h3 className="h3 tools-title">Tools I Use</h3>
            <ul className="tools-grid">
              {tools.map((tool) => (
                <li className="tool-card" key={tool.name}>
                  <div className="tool-icon-box">
                    <ToolIcon name={tool.name} />
                  </div>
                  <span className="tool-name">{tool.name}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="seo-faq reveal" aria-labelledby="seo-faq-title">
            <h3 className="h3" id="seo-faq-title">
              Frequently asked questions
            </h3>
            <div className="seo-faq-list">
              {seoFaq.map((item) => (
                <details key={item.question} className="seo-faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <article className={`resume${page === "resume" ? " active" : ""}`}>
          <header>
            <h2 className="h2 article-title">Resume</h2>
          </header>

          <section className="timeline reveal">
            <div className="title-wrapper">
              <div className="icon-box">
                <IonIcon name="book-outline" />
              </div>
              <h3 className="h3">Education</h3>
            </div>
            <EducationList />
          </section>

          <section className="timeline reveal">
            <div className="title-wrapper">
              <div className="icon-box">
                <IonIcon name="briefcase-outline" />
              </div>
              <h3 className="h3">Experience</h3>
            </div>
            <ExperienceList />
          </section>

          <section className="skill reveal">
            <h3 className="h3 skills-title">My skills</h3>
            <SkillsPanel />
          </section>
        </article>

        <article className={`portfolio${page === "portfolio" ? " active" : ""}`}>
          <header>
            <h2 className="h2 article-title">Portfolio</h2>
          </header>

          <section className="projects reveal">
            <ul className="filter-list">
              {filters.map((label) => (
                <li className="filter-item" key={label}>
                  <button
                    className={filterLabel === label ? "active" : ""}
                    type="button"
                    onClick={() => applyFilter(label)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="filter-select-box">
              <button
                className={`filter-select${selectOpen ? " active" : ""}`}
                type="button"
                onClick={() => setSelectOpen((open) => !open)}
              >
                <div className="select-value">{filterLabel}</div>
                <div className="select-icon">
                  <IonIcon name="chevron-down" />
                </div>
              </button>

              <ul className="select-list">
                {filters.map((label) => (
                  <li className="select-item" key={label}>
                    <button type="button" onClick={() => applyFilter(label)}>
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="project-list">
              {projects.map((project) => {
                const visible = filter === "all" || filter === project.category.toLowerCase();
                return (
                  <li
                    className={`project-item${visible ? " active" : ""}`}
                    key={project.slug}
                  >
                    <Link href={`/portfolio/${project.slug}`}>
                      <figure className="project-img">
                        <div className="project-item-icon-box">
                          <IonIcon name="eye-outline" />
                        </div>
                        {project.image ? (
                          <img src={project.image} alt={project.title} />
                        ) : (
                          <div
                            className="project-cover"
                            style={{ background: projectCovers[project.category] }}
                          >
                            {project.title}
                          </div>
                        )}
                      </figure>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-category">{project.category}</p>
                      <ul className="project-tech">
                        {project.tech.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </article>

        <article className={`blog${page === "blog" ? " active" : ""}`}>
          <header>
            <h2 className="h2 article-title">Blog</h2>
          </header>

          <section className="blog-posts reveal">
            <p className="blog-intro">
              Guides for website development in Kerala — hiring, pricing, ecommerce,
              and SEO traffic tips built around the searches people actually use.
            </p>
            <ul className="blog-posts-list">
              {blogs.map((post) => (
                <li className="blog-post-item blog-posts-item" key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <figure className="blog-banner-box">
                      <img src={post.image} alt={`${post.title} thumbnail`} />
                    </figure>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <p className="blog-category">{post.category}</p>
                        <span className="dot"></span>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <h3 className="h3 blog-item-title">{post.title}</h3>
                      <p className="blog-text">{post.summary}</p>
                      <p className="blog-keyword">Focus: {post.keyword}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>

        <article className={`contact${page === "contact" ? " active" : ""}`}>
          <header>
            <h2 className="h2 article-title">Contact</h2>
          </header>

          <section className="mapbox reveal">
            <figure>
              <iframe
                src={profile.mapSrc}
                title="Map of Malappuram, Kerala"
                width="400"
                height="300"
                loading="lazy"
              ></iframe>
            </figure>
          </section>

          <address className="contact-address reveal">
            {profile.address.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            <a href={profile.github} target="_blank" rel="noreferrer">
              github.com/shabeeb1044
            </a>
          </address>

          <section className="contact-form reveal">
            <h3 className="h3 form-title">Contact form</h3>
            <form className="form" onSubmit={onSubmit}>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="fullname"
                  className="form-input"
                  placeholder="Full name"
                  required
                  onInput={onFormInput}
                />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Email address"
                  required
                  onInput={onFormInput}
                />
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="Phone number"
                  autoComplete="tel"
                  required
                  onInput={onFormInput}
                />
              </div>
              <textarea
                name="message"
                className="form-input"
                placeholder="Your message"
                required
                onInput={onFormInput}
              ></textarea>
              <button className="form-btn" type="submit" disabled={!canSend || sending}>
                <IonIcon name="paper-plane" />
                <span>{sending ? "Sending..." : "Send Message"}</span>
              </button>
              {formNote ? <p className="form-note">{formNote}</p> : null}
            </form>
          </section>
        </article>
      </div>
    </main>
  );
}

export default function PortfolioApp() {
  return (
    <Suspense fallback={<main />}>
      <PortfolioAppInner />
    </Suspense>
  );
}
