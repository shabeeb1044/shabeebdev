export function applySiteFavicon(theme) {
  if (typeof document === "undefined") return;

  const href = theme === "light" ? "/favicon-light.svg" : "/favicon-dark.svg";
  const links = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');

  if (!links.length) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = href;
    document.head.appendChild(link);
    return;
  }

  links.forEach((node) => {
    if (!node.parentNode) return;
    node.type = "image/svg+xml";
    node.media = "";
    node.href = href;
  });
}
