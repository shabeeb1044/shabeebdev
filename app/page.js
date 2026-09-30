import PortfolioApp from "./components/PortfolioApp";
import { getJsonLdGraph, jsonLdHtml } from "./data/seo";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(getJsonLdGraph()) }}
      />
      <PortfolioApp />
    </>
  );
}
