import { blogs } from "./data/blogs";
import { projects } from "./data/profile";
import { siteConfig } from "./data/seo";

export default function sitemap() {
  const lastModified = new Date();

  const projectEntries = projects.map((project) => ({
    url: `${siteConfig.url}/portfolio/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries = blogs.map((blog) => ({
    url: `${siteConfig.url}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...blogEntries,
    ...projectEntries,
  ];
}
