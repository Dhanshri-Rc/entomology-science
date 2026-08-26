import { Helmet } from "react-helmet-async";

const SITE_NAME = "Entomology Science Association";
const SITE_URL = "https://www.entomologyscience.org";
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-home-beetle.jpg`;

/**
 * Centralized, reusable SEO component.
 *
 * Usage:
 * <SEO
 *   title="Submit Your Paper | International Conference on Entomology"
 *   description="Submit your original research to ICEBIS 2027..."
 *   canonical="/submit-paper"
 * />
 */
export default function SEO({
  title,
  description,
  canonical,
  keywords,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  structuredData = null,
}) {
  const fullTitle = title
    ? title.includes(SITE_NAME)
      ? title
      : `${title}`
    : SITE_NAME;

  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical.startsWith("/") ? "" : "/"}${canonical}`
    : SITE_URL;

  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}

export { SITE_NAME, SITE_URL };
