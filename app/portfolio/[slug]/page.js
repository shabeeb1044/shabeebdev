import Link from "next/link";
import { notFound } from "next/navigation";
import IonIcon from "../../components/IonIcon";
import ThemeToggle from "../../components/ThemeToggle";
import {
  getProjectBySlug,
  profile,
  projectCovers,
  projects,
} from "../../data/profile";
import { siteConfig } from "../../data/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found" };
  }

  const title = `${project.title} — Website Development Kerala`;
  const description = `${project.summary} Built by ${profile.name}, a web developer in Kerala offering low cost website development and full-stack web apps.`;

  return {
    title,
    description,
    keywords: [
      project.title,
      "website development Kerala",
      "web developer in Kerala",
      "low cost website development",
      project.category,
      ...(project.stack || project.tech || []),
    ],
    alternates: {
      canonical: `/portfolio/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${profile.name}`,
      description,
      url: `${siteConfig.url}/portfolio/${project.slug}`,
      images: project.image
        ? [{ url: project.image, alt: `${project.title} preview` }]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = projects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 3);

  const role = project.role || "Web Developer";
  const type = project.type || project.category;
  const status = project.status || (project.liveUrl ? "Live" : "Completed");
  const stack = project.stack || project.tech;

  return (
    <main className="detail-main">
      <article className="detail-card active">
        <div className="detail-top">
          <Link href="/?page=portfolio" className="detail-back">
            <IonIcon name="arrow-back-outline" />
            <span>Back to portfolio</span>
          </Link>
          <ThemeToggle className="detail-theme-toggle" />
        </div>

        <header className="detail-header reveal">
          <p className="detail-kicker">{project.category}</p>
          <h1 className="h2 article-title">{project.title}</h1>
          <p className="detail-summary">{project.summary}</p>
        </header>

        {project.image ? (
          <figure
            className={`detail-hero detail-hero-shot reveal${
              project.imageFit === "full" ? " detail-hero-full" : ""
            }`}
          >
            <img src={project.image} alt={`${project.title} preview`} />
          </figure>
        ) : (
          <figure
            className="detail-hero reveal"
            style={{ background: projectCovers[project.category] }}
          >
            <span>{project.title}</span>
          </figure>
        )}

        <section className="detail-meta reveal" aria-label="Project facts">
          <div>
            <span>Role</span>
            <strong>{role}</strong>
          </div>
          <div>
            <span>Project</span>
            <strong>{type}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong className="detail-status">
              <i className="detail-status-dot" aria-hidden="true"></i>
              {status}
            </strong>
          </div>
        </section>

        <div className="detail-grid">
          <section className="detail-section reveal">
            <h3 className="h3">About the project</h3>
            <p className="detail-text">{project.description}</p>
          </section>

          <section className="detail-section reveal">
            <h3 className="h3">Stack</h3>
            <ul className="project-tech detail-tech">
              {stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {project.challenge || project.result ? (
          <div className="detail-grid">
            {project.challenge ? (
              <section className="detail-section reveal">
                <h3 className="h3">Challenge</h3>
                <p className="detail-text">{project.challenge}</p>
              </section>
            ) : null}
            {project.result ? (
              <section className="detail-section reveal">
                <h3 className="h3">Result</h3>
                <p className="detail-text">{project.result}</p>
              </section>
            ) : null}
          </div>
        ) : null}

        {project.modules?.length ? (
          <section className="detail-section reveal">
            <h3 className="h3">{project.modulesTitle || "Architecture"}</h3>
            <ul className="detail-modules">
              {project.modules.map((module) => (
                <li key={module.title}>
                  <strong>{module.title}</strong>
                  <p>{module.text}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="detail-section reveal">
          <h3 className="h3">What it includes</h3>
          <ul className="detail-features">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        {project.responsibilities?.length ? (
          <section className="detail-section reveal">
            <h3 className="h3">{project.responsibilitiesTitle || "My role"}</h3>
            {project.responsibilitiesIntro ? (
              <p className="detail-text detail-board-intro">{project.responsibilitiesIntro}</p>
            ) : null}
            <ul className="detail-features">
              {project.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.benefits?.length ? (
          <section className="detail-section reveal">
            <h3 className="h3">{project.benefitsTitle || "Benefits for companies"}</h3>
            <ul className="detail-benefits">
              {project.benefits.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.board ? (
          <section className="detail-section reveal">
            <h3 className="h3">{project.board.heading || "On the board"}</h3>
            <p className="detail-text detail-board-intro">{project.board.intro}</p>
            <p className="detail-kicker">{project.board.projectsLabel || "Projects"}</p>
            <ul className="detail-chip-row">
              {project.board.projects.map((item) => (
                <li className="detail-chip" key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="detail-kicker">{project.board.viewsLabel || "Views"}</p>
            <ul className="detail-chip-row">
              {project.board.views.map((item) => (
                <li className="detail-chip" key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <ul className="detail-board">
              {project.board.groups.map((group) => (
                <li key={group.name}>
                  <strong>{group.name}</strong>
                  <ul>
                    {group.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.liveUrl || project.repoUrl ? (
          <section className="detail-actions reveal">
            {project.liveUrl ? (
              <a
                className="detail-btn detail-btn-primary"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                <IonIcon name="globe-outline" />
                <span>Open live site</span>
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                className="detail-btn"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                <IonIcon name="logo-github" />
                <span>View on GitHub</span>
              </a>
            ) : null}
          </section>
        ) : null}

        {related.length ? (
          <section className="detail-related-block reveal">
            <div className="detail-related-head">
              <div>
                <p className="detail-kicker">Related work</p>
                <h3 className="h3">More in {project.category}</h3>
              </div>
              <Link className="detail-related-all" href="/?page=portfolio">
                <span>All projects</span>
                <IonIcon name="arrow-forward-outline" />
              </Link>
            </div>
            <ul className="detail-related">
              {related.map((item) => {
                const tags = (item.tech || []).slice(0, 2);
                return (
                  <li key={item.slug}>
                    <Link href={`/portfolio/${item.slug}`}>
                      <figure className="detail-related-shot">
                        {item.image ? (
                          <img src={item.image} alt="" />
                        ) : (
                          <span
                            className="detail-related-cover"
                            style={{ background: projectCovers[item.category] }}
                          >
                            {item.title}
                          </span>
                        )}
                        <span className="detail-related-open" aria-hidden="true">
                          <IonIcon name="arrow-forward-outline" />
                        </span>
                      </figure>
                      <div className="detail-related-copy">
                        <strong>{item.title}</strong>
                        <span>{item.summary}</span>
                        {tags.length ? (
                          <ul className="detail-related-tags">
                            {tags.map((tag) => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
}
