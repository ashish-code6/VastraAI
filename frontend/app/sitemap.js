const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const routes = [
    "",
    "/style",
    "/saved",
    "/login",
    "/signup",
    "/profile",
    "/upload",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
