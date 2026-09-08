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

console.log('\n--- 3. Testing index.html ---');
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
  assert(jsonLd.url === 'https://www.jayashakthitoursandtravels.com/', 'JSON-LD url is official production domain');
  assert(jsonLd.telephone === '+91-9444796073', 'JSON-LD telephone is +91-9444796073');
  assert(jsonLd.email === 'jayashakthitourstravels@gmail.com', 'JSON-LD email is jayashakthitourstravels@gmail.com');
  assert(jsonLd.sameAs?.includes('https://www.instagram.com/jayashakthi_tours'), 'JSON-LD sameAs includes Instagram profile');
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

console.log('\n--- 5. Testing Centralized SEO Config ---');
import { PRODUCTION_DOMAIN, BRAND_NAME, getCanonicalUrl, routesSeo } from '../src/config/seo';
assert(PRODUCTION_DOMAIN === 'https://www.jayashakthitoursandtravels.com', 'PRODUCTION_DOMAIN is correct');
assert(BRAND_NAME === 'JAYASHAKTHI TOURS & TRAVELS', 'BRAND_NAME is strictly JAYASHAKTHI TOURS & TRAVELS');

assert(getCanonicalUrl('/') === 'https://www.jayashakthitoursandtravels.com/', 'Canonical for / matches');
assert(getCanonicalUrl('/packages') === 'https://www.jayashakthitoursandtravels.com/packages', 'Canonical for /packages matches');
assert(getCanonicalUrl('/plan-my-trip') === 'https://www.jayashakthitoursandtravels.com/booking', 'Alias /plan-my-trip canonicalizes to /booking');
assert(getCanonicalUrl('/review') === 'https://www.jayashakthitoursandtravels.com/reviews', 'Alias /review canonicalizes to /reviews');

assert(routesSeo['/admin'].noindex === true, '/admin is configured with noindex: true');
assert(routesSeo['/admin/login'].noindex === true, '/admin/login is configured with noindex: true');

console.log('\n✨ ALL SEO SPECIFICATIONS VERIFIED SUCCESSFULLY! ✨');
