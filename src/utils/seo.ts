import {
  PRODUCTION_DOMAIN,
  BRAND_NAME,
  getCanonicalUrl,
  travelAgencyStructuredData,
} from '../config/seo';

export interface SeoConfig {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  image?: string;
  structuredData?: Record<string, any>;
}

function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonicalLink(href: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setStructuredDataScript(id: string, data: Record<string, any> | null) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!data) {
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function updatePageSeo(config: SeoConfig) {
  if (typeof document === 'undefined') return;

  // 1. Title
  const defaultTitle = `Jayashakthi Tours & Travels | Tours, Travel & Cab Services in India`;
  if (config.title) {
    if (
      config.title.includes('Jayashakthi Tours & Travels') ||
      config.title.includes('JAYASHAKTHI TOURS & TRAVELS')
    ) {
      document.title = config.title;
    } else {
      document.title = `${config.title} | ${BRAND_NAME}`;
    }
  } else {
    document.title = defaultTitle;
  }

  // 2. Meta Description
  const description =
    config.description ||
    'Plan memorable journeys across India with Jayashakthi Tours & Travels. Explore customized tours, reliable cab services, travel planning and personalized experiences for your next journey.';
  setMetaTag('name', 'description', description);

  // 3. Canonical URL
  const currentPath = window.location.pathname;
  const canonicalUrl = config.canonical || getCanonicalUrl(currentPath);
  setCanonicalLink(canonicalUrl);

  // 4. Robots Directives
  const isNoindex =
    config.noindex === true ||
    currentPath.startsWith('/admin') ||
    currentPath === '/submit-review';
  setMetaTag(
    'name',
    'robots',
    isNoindex ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );

  // 5. Open Graph Metadata
  const pageTitle = document.title;
  const shareImage =
    config.image || `${PRODUCTION_DOMAIN}/images/poster/jayashakthi-tours-poster.png`;

  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:site_name', BRAND_NAME);
  setMetaTag('property', 'og:title', pageTitle);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:image', shareImage);

  // 6. Twitter / X Metadata
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', pageTitle);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', shareImage);

  // 7. Dynamic JSON-LD Structured Data
  if (config.structuredData) {
    setStructuredDataScript('route-structured-data', config.structuredData);
  } else {
    setStructuredDataScript('route-structured-data', null);
  }
}

export { travelAgencyStructuredData };
