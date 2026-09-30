export function applySiteFavicon(theme) {
  if (typeof document === "undefined") return;

  const href = theme === "light" ? "/favicon-light.png" : "/favicon-dark.png";
  const links = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');

  if (!links.length) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = href;
    document.head.appendChild(link);
    return;
  }

  links.forEach((node) => {
    if (!node.parentNode) return;
    node.type = "image/png";
    node.media = "";
    node.href = href;
  });
}
