import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

console.log('--- 1. Testing robots.txt ---');
const robotsPath = path.join(rootDir, 'public', 'robots.txt');
assert(fs.existsSync(robotsPath), 'public/robots.txt exists');
const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
assert(robotsContent.includes('User-agent: *'), 'robots.txt specifies User-agent: *');
assert(robotsContent.includes('Allow: /'), 'robots.txt specifies Allow: /');
assert(robotsContent.includes('Disallow: /admin'), 'robots.txt specifies Disallow: /admin');
assert(robotsContent.includes('Disallow: /admin/'), 'robots.txt specifies Disallow: /admin/');
assert(
  robotsContent.includes('Sitemap: https://www.jayashakthitoursandtravels.com/sitemap.xml'),
  'robots.txt specifies official production sitemap URL'
);

console.log('\n--- 2. Testing sitemap.xml ---');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml exists');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
assert(sitemapContent.startsWith('<?xml'), 'sitemap.xml starts with XML declaration');
assert(sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'sitemap.xml has correct namespace');
assert(sitemapContent.includes('<lastmod>'), 'sitemap.xml contains lastmod tags');

const expectedUrls = [
  'https://www.jayashakthitoursandtravels.com/',
  'https://www.jayashakthitoursandtravels.com/packages',
  'https://www.jayashakthitoursandtravels.com/booking',
  'https://www.jayashakthitoursandtravels.com/gallery',
  'https://www.jayashakthitoursandtravels.com/reviews',
  'https://www.jayashakthitoursandtravels.com/about',
  'https://www.jayashakthitoursandtravels.com/services',
  'https://www.jayashakthitoursandtravels.com/itinerary',
  'https://www.jayashakthitoursandtravels.com/contact',
];

for (const url of expectedUrls) {
  assert(sitemapContent.includes(`<loc>${url}</loc>`), `sitemap.xml contains ${url}`);
}

assert(!sitemapContent.includes('/admin'), 'sitemap.xml excludes /admin');
assert(!sitemapContent.includes('vercel.app'), 'sitemap.xml contains no vercel.app domains');

console.log('\n--- 3. Testing index.html & Static JSON-LD ---');
const indexPath = path.join(rootDir, 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf-8');
assert(indexContent.includes('https://www.jayashakthitoursandtravels.com/'), 'index.html has production canonical domain');
assert(indexContent.includes('name="google-site-verification"'), 'index.html contains GSC verification placeholder');
assert(indexContent.includes('property="og:site_name" content="JAYASHAKTHI TOURS & TRAVELS"'), 'index.html has og:site_name set to JAYASHAKTHI TOURS & TRAVELS');
assert(!indexContent.includes('vercel.app'), 'index.html contains zero vercel.app references');

// Verify JSON-LD in index.html parses correctly
const jsonLdMatch = indexContent.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(Boolean(jsonLdMatch && jsonLdMatch[1]), 'index.html contains application/ld+json script');
if (jsonLdMatch) {
  const jsonLd = JSON.parse(jsonLdMatch[1]);
  assert(jsonLd['@type'] === 'TravelAgency', 'JSON-LD type is TravelAgency');
  assert(jsonLd.name === 'JAYASHAKTHI TOURS & TRAVELS', 'JSON-LD name is JAYASHAKTHI TOURS & TRAVELS');
  assert(Array.isArray(jsonLd.alternateName) && jsonLd.alternateName.length > 5, 'JSON-LD has alternateName array with spelling variations');
  assert(jsonLd.alternateName.includes('Jaya Shakthi Tours & Travels'), 'alternateName includes Jaya Shakthi Tours & Travels');
  assert(jsonLd.alternateName.includes('Jaya Sakthi Tours & Travels'), 'alternateName includes Jaya Sakthi Tours & Travels');
  assert(jsonLd.alternateName.includes('Jaya Shakti Tours & Travels'), 'alternateName includes Jaya Shakti Tours & Travels');
  assert(jsonLd.url === 'https://www.jayashakthitoursandtravels.com/', 'JSON-LD url is official production domain');
  assert(jsonLd.telephone === '+91-9444796073', 'JSON-LD telephone is +91-9444796073');
  assert(jsonLd.email === 'jayashakthitourstravels@gmail.com', 'JSON-LD email is jayashakthitourstravels@gmail.com');
  assert(jsonLd.sameAs?.includes('https://www.instagram.com/jayashakthi_tours'), 'JSON-LD sameAs includes Instagram profile');
  assert(jsonLd.geo?.latitude === 13.0604, 'JSON-LD includes geo latitude');
  assert(jsonLd.address?.postalCode === '600094', 'JSON-LD address postalCode is 600094');
  assert(jsonLd.address?.streetAddress.includes('Padmanabha Nagar, Choolaimedu'), 'JSON-LD address is Padmanabha Nagar, Choolaimedu');
}

console.log('\n--- 4. Testing vercel.json ---');
const vercelPath = path.join(rootDir, 'vercel.json');
const vercelContent = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
assert(Boolean(vercelContent.redirects && vercelContent.redirects.length > 0), 'vercel.json contains redirect rules');
const nonWwwRedirect = vercelContent.redirects.find((r: any) =>
  r.has?.some((h: any) => h.value === 'jayashakthitoursandtravels.com')
);
assert(Boolean(nonWwwRedirect), 'vercel.json redirects jayashakthitoursandtravels.com to www');
assert(nonWwwRedirect?.permanent === true, 'non-www redirect is 301 permanent');

console.log('\n--- 5. Testing Centralized SEO Config & Breadcrumbs ---');
import {
  PRODUCTION_DOMAIN,
  BRAND_NAME,
  getCanonicalUrl,
  routesSeo,
  travelAgencyStructuredData,
  faqStructuredData,
  getBreadcrumbStructuredData,
} from '../src/config/seo';
import { business } from '../src/config/business';

assert(PRODUCTION_DOMAIN === 'https://www.jayashakthitoursandtravels.com', 'PRODUCTION_DOMAIN is correct');
assert(BRAND_NAME === 'JAYASHAKTHI TOURS & TRAVELS', 'BRAND_NAME is strictly JAYASHAKTHI TOURS & TRAVELS');

assert(getCanonicalUrl('/') === 'https://www.jayashakthitoursandtravels.com/', 'Canonical for / matches');
assert(getCanonicalUrl('/packages') === 'https://www.jayashakthitoursandtravels.com/packages', 'Canonical for /packages matches');
assert(getCanonicalUrl('/plan-my-trip') === 'https://www.jayashakthitoursandtravels.com/booking', 'Alias /plan-my-trip canonicalizes to /booking');
assert(getCanonicalUrl('/review') === 'https://www.jayashakthitoursandtravels.com/reviews', 'Alias /review canonicalizes to /reviews');

assert(routesSeo['/admin'].noindex === true, '/admin is configured with noindex: true');
assert(routesSeo['/admin/login'].noindex === true, '/admin/login is configured with noindex: true');

// Verify Breadcrumbs generator
const breadcrumbs = getBreadcrumbStructuredData('/packages');
assert(breadcrumbs !== null && breadcrumbs['@type'] === 'BreadcrumbList', 'getBreadcrumbStructuredData generates BreadcrumbList');
assert(breadcrumbs?.itemListElement?.length === 2, 'Breadcrumb for /packages has 2 items');

// Verify TravelAgency structured data
assert(Array.isArray(travelAgencyStructuredData.alternateName), 'travelAgencyStructuredData has alternateName array');
assert(travelAgencyStructuredData.alternateName.includes('Jaya Shakthi Tours & Travels'), 'travelAgencyStructuredData includes Jaya Shakthi Tours & Travels');
assert(travelAgencyStructuredData.address.streetAddress.includes('Padmanabha Nagar, Choolaimedu'), 'Address is Padmanabha Nagar, Choolaimedu');
assert(travelAgencyStructuredData.address.postalCode === '600094', 'Postal code is 600094');

// Verify FAQ consistency
const faqAddressAnswer = faqStructuredData.mainEntity.find((q) => q.name.includes('contact'));
assert(Boolean(faqAddressAnswer && faqAddressAnswer.acceptedAnswer.text.includes('Padmanabha Nagar, Choolaimedu')), 'FAQ answer specifies Padmanabha Nagar, Choolaimedu');

console.log('\n--- 6. Testing Address Consistency Across All Files ---');
const faqSectionPath = path.join(rootDir, 'src', 'components', 'home', 'FaqSection.tsx');
const faqSectionContent = fs.readFileSync(faqSectionPath, 'utf-8');
assert(faqSectionContent.includes('Padmanabha Nagar, Choolaimedu'), 'FaqSection.tsx has verified address');
assert(!faqSectionContent.includes('Madipakkam'), 'FaqSection.tsx has zero legacy Madipakkam references');

const aboutPath = path.join(rootDir, 'src', 'pages', 'About.tsx');
const aboutContent = fs.readFileSync(aboutPath, 'utf-8');
assert(aboutContent.includes('Padmanabha Nagar, Choolaimedu') || aboutContent.includes(business.address.formatted), 'About.tsx includes official registered address');
assert(aboutContent.includes('Jaya Shakthi Tours'), 'About.tsx clarifies brand search variations');

console.log('\n--- 7. Testing Internal Brand Search Matrix ---');
import {
  BRAND_VARIATIONS,
  SPELLING_VARIATIONS,
  VERIFIED_LOCATIONS,
  VERIFIED_SERVICES,
  VERIFIED_DESTINATIONS,
  masterSearchMatrix,
} from '../src/data/brandSearchMatrix';

assert(BRAND_VARIATIONS.length >= 15, `Identified ${BRAND_VARIATIONS.length} brand variations`);
assert(SPELLING_VARIATIONS.length >= 5, `Identified ${SPELLING_VARIATIONS.length} spelling variations`);
assert(VERIFIED_LOCATIONS.length >= 4, `Identified ${VERIFIED_LOCATIONS.length} verified locations`);
assert(VERIFIED_SERVICES.length >= 8, `Identified ${VERIFIED_SERVICES.length} verified services`);
assert(VERIFIED_DESTINATIONS.length >= 8, `Identified ${VERIFIED_DESTINATIONS.length} verified destinations`);
assert(masterSearchMatrix.length >= 15, `Master search matrix has ${masterSearchMatrix.length} mapped entries`);

console.log('\n✨ ALL SEO, AEO, GEO & SEARCH IDENTITY CHECKS PASSED SUCCESSFULLY! ✨');
