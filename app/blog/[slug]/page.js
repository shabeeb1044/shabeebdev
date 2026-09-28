import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import IonIcon from "../../components/IonIcon";
import ThemeToggle from "../../components/ThemeToggle";
import { blogs, getBlogBySlug } from "../../data/blogs";
import { profile } from "../../data/profile";
import { siteConfig } from "../../data/seo";

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) {
    return { title: "Blog not found" };
  }

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.keywords,
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.description,
      url: `${siteConfig.url}/blog/${blog.slug}`,
      publishedTime: blog.date,
      images: [{ url: blog.image, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const related = blogs.filter((item) => item.slug !== blog.slug).slice(0, 3);
  const published = new Date(blog.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: `${siteConfig.url}${blog.image}`,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${blog.slug}`,
    keywords: blog.keywords.join(", "),
  };

  return (
    <main className="detail-main">
      <Script
        id={`ld-blog-${blog.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(articleJsonLd)}
      </Script>
      <article className="detail-card active">
        <div className="detail-top">
          <Link href="/?page=blog" className="detail-back">
            <IonIcon name="arrow-back-outline" />
            <span>Back to blog</span>
          </Link>
          <ThemeToggle className="detail-theme-toggle" />
        </div>

        <header className="detail-header reveal">
          <p className="detail-kicker">{blog.category}</p>
          <h1 className="h2 article-title">{blog.title}</h1>
          <p className="detail-summary">{blog.summary}</p>
        </header>

        <figure className="detail-hero detail-hero-shot reveal">
          <img src={blog.image} alt={`${blog.title} thumbnail`} />
        </figure>

        <section className="detail-meta reveal" aria-label="Article facts">
          <div>
            <span>Published</span>
            <strong>
              <time dateTime={blog.date}>{published}</time>
            </strong>
          </div>
          <div>
            <span>Read time</span>
            <strong>{blog.readTime}</strong>
          </div>
          <div>
            <span>Focus keyword</span>
            <strong>{blog.keyword}</strong>
          </div>
        </section>

        <div className="blog-detail-body">
          {blog.sections.map((section) => (
            <section className="detail-section reveal" key={section.heading}>
              <h2 className="h3">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p className="detail-text" key={paragraph}>
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="detail-features">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="detail-actions reveal">
          <Link className="detail-btn detail-btn-primary" href="/?page=contact">
            <IonIcon name="mail-outline" />
            <span>Hire for website development</span>
          </Link>
          <Link className="detail-btn" href="/?page=portfolio">
            <IonIcon name="images-outline" />
            <span>View portfolio</span>
          </Link>
        </section>

        {related.length ? (
          <section className="detail-related-block reveal">
            <div className="detail-related-head">
              <div>
                <p className="detail-kicker">Keep reading</p>
                <h3 className="h3">More SEO guides</h3>
              </div>
              <Link className="detail-related-all" href="/?page=blog">
                <span>All guides</span>
                <IonIcon name="arrow-forward-outline" />
              </Link>
            </div>
            <ul className="detail-related">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`}>
                    <figure className="detail-related-shot">
                      <img src={item.image} alt="" />
                      <span className="detail-related-open" aria-hidden="true">
                        <IonIcon name="arrow-forward-outline" />
                      </span>
                    </figure>
                    <div className="detail-related-copy">
                      <strong>{item.title}</strong>
                      <span>{item.summary}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
}
