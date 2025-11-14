import React from "react";
import { Helmet } from "react-helmet-async";
import { SEOData, defaultSEO, structuredData } from "../utils/seo";

interface SEOHeadProps {
  seo?: Partial<SEOData>;
  type?: "website" | "article";
  schema?: object;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  seo,
  type = "website",
  schema,
  noIndex = false,
}) => {
  const meta = { ...defaultSEO, ...seo };
  const url = meta.url?.startsWith("http")
    ? meta.url
    : `https://younickdesign.com${meta.url || ""}`;
  const schemaData =
    schema && Object.keys(schema).length > 0
      ? { ...structuredData.organization, ...schema }
      : structuredData.organization;

  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>{meta.title}</title>

      {/* Primary Meta */}
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      <meta name="author" content="Younick Design Studio" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0D0D0D" />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Younick Design Studio" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      {meta.image && (
        <>
          <meta property="og:image" content={meta.image} />
          <meta property="og:image:alt" content={meta.title} />
        </>
      )}
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_IN" />
      {(meta as any).datePublished && (
        <meta
          property="article:published_time"
          content={(meta as any).datePublished}
        />
      )}
      {(meta as any).dateModified && (
        <meta
          property="article:modified_time"
          content={(meta as any).dateModified}
        />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.image && <meta name="twitter:image" content={meta.image} />}
      <meta name="twitter:creator" content="@younickstudio" />
      <meta name="twitter:site" content="@younickstudio" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>

      {/* Favicons & PWA */}
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Font Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
    </Helmet>
  );
};

export default SEOHead;
