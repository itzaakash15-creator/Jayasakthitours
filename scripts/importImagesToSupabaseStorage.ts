/**
 * Script to import all 20 client and past-client travel photographs
 * into Supabase Storage 'gallery' bucket and generate the gallery manifest.
 *
 * Usage:
 *   export PATH="/Users/aakashk/.local/bin:$PATH"
 *   npx tsx scripts/importImagesToSupabaseStorage.ts
 */

import fs from 'fs';
import path from 'path';

// Polyfill WebSocket for Node.js 20 environment
if (typeof (globalThis as any).WebSocket === 'undefined') {
  (globalThis as any).WebSocket = class DummyWebSocket {};
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ouxbzcsgrfxlgcyegtwa.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_gh-Ta8gDHh2hfUtII8sUgg_NXQvqc8F';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_TRAVEL_DIR = path.resolve(__dirname, '../public/images/client-travel');
const PAST_CLIENTS_DIR = path.resolve(__dirname, '../public/images/past-clients');

// Define metadata for all 20 images
const CLIENT_IMAGE_METADATA: Record<string, {
  title: string;
  caption: string;
  location: string;
  category: string;
  aspect: 'landscape' | 'portrait';
}> = {
  'client-travel-01.jpg': {
    title: 'Tamil Nadu Countryside',
    caption: 'International group enjoying the lush rural landscapes and village fields of Tamil Nadu',
    location: 'Tamil Nadu Countryside',
    category: 'Client Experiences',
    aspect: 'landscape',
  },
  'client-travel-02.jpg': {
    title: 'Airavatesvara Temple, Darasuram',
    caption: 'Travelers resting on the UNESCO World Heritage stone chariot mandapa steps in Kumbakonam',
    location: 'Darasuram, Kumbakonam',
    category: 'Temple Tours',
    aspect: 'landscape',
  },
  'client-travel-03.jpg': {
    title: 'Thirumalai Nayakkar Mahal, Madurai',
    caption: 'Group photo in the majestic courtyard arcade of the 17th-century Nayak palace in Madurai',
    location: 'Madurai, Tamil Nadu',
    category: 'Client Experiences',
    aspect: 'portrait',
  },
  'client-travel-04.jpg': {
    title: 'Meenakshi Temple, Madurai',
    caption: 'Travelers in traditional attire before the iconic colorful gopuram of Madurai Meenakshi Amman Temple',
    location: 'Madurai, Tamil Nadu',
    category: 'Temple Tours',
    aspect: 'portrait',
  },
  'client-travel-05.jpg': {
    title: 'Brihadisvara Temple, Thanjavur',
    caption: 'Tour group at the entrance gateway of the Great Chola Big Temple in Thanjavur',
    location: 'Thanjavur, Tamil Nadu',
    category: 'Temple Tours',
    aspect: 'portrait',
  },
  'client-travel-06.jpg': {
    title: 'Kanyakumari Coast, Tamil Nadu',
    caption: 'Playful travel moments at sunset by the rocky promenade of India’s southernmost tip in Kanyakumari',
    location: 'Kanyakumari, Tamil Nadu',
    category: 'Client Experiences',
    aspect: 'landscape',
  },
  'client-travel-07.jpg': {
    title: 'Mahabalipuram, Tamil Nadu',
    caption: 'Authentic village cart encounter and cultural exploration near the coastal heritage town of Mahabalipuram',
    location: 'Mahabalipuram, Tamil Nadu',
    category: 'Client Experiences',
    aspect: 'landscape',
  },
  'client-travel-08.jpg': {
    title: 'Pichavaram Mangroves, Chidambaram',
    caption: 'Boating excursion with life jackets through the winding tidal mangrove canals of Pichavaram',
    location: 'Pichavaram, Tamil Nadu',
    category: 'Client Experiences',
    aspect: 'portrait',
  },
  'client-travel-09.jpg': {
    title: 'Tamil Nadu Heritage Village',
    caption: 'Immersive countryside walk among towering palm groves and traditional farmland in Tamil Nadu',
    location: 'Tamil Nadu',
    category: 'Client Experiences',
    aspect: 'portrait',
  },
  'client-travel-10.jpg': {
    title: 'Thirumalai Nayakkar Palace, Madurai',
    caption: 'Travelers marveling at the soaring stucco arches and classical pillars of Madurai’s royal palace',
    location: 'Madurai, Tamil Nadu',
    category: 'Client Experiences',
    aspect: 'portrait',
  },
  'past-client-01.jpg': {
    title: 'Amber Fort, Jaipur',
    caption: 'Scenic vista of historic Amber Fort, Maota Lake, and the Aravalli hill fortifications in Jaipur, Rajasthan',
    location: 'Jaipur, Rajasthan',
    category: 'Rajasthan',
    aspect: 'landscape',
  },
  'past-client-02.jpg': {
    title: 'Amer Palace, Jaipur',
    caption: 'The geometric Mughal Charbagh garden and Jaigarh Fort seen from the Amber Palace corridors',
    location: 'Jaipur, Rajasthan',
    category: 'Rajasthan',
    aspect: 'portrait',
  },
  'past-client-03.jpg': {
    title: 'Amber Fort Window View, Jaipur',
    caption: 'Courtyard and Aravalli hills framed through a carved star-shaped palace window at Amber Fort',
    location: 'Jaipur, Rajasthan',
    category: 'Rajasthan',
    aspect: 'portrait',
  },
  'past-client-04.jpg': {
    title: 'Amer Town, Jaipur',
    caption: 'Panoramic view overlooking historic Amer settlement and the hill ramparts from the fort palace',
    location: 'Jaipur, Rajasthan',
    category: 'Rajasthan',
    aspect: 'portrait',
  },
  'past-client-05.jpg': {
    title: 'Sheesh Mahal, Jaipur',
    caption: 'Classical scalloped arches opening onto the manicured central garden of Amber Fort Palace',
    location: 'Jaipur, Rajasthan',
    category: 'Rajasthan',
    aspect: 'portrait',
  },
  'past-client-06.jpg': {
    title: 'Raisina Hill, New Delhi',
    caption: 'Grand colonial heritage architecture and sandstone domes of Central Secretariat in New Delhi',
    location: 'New Delhi',
    category: 'Golden Triangle',
    aspect: 'landscape',
  },
  'past-client-07.jpg': {
    title: 'Lotus Temple, New Delhi',
    caption: 'The iconic white marble lotus petals of the Baháʼí House of Worship amidst landscaped lawns in New Delhi',
    location: 'New Delhi',
    category: 'Golden Triangle',
    aspect: 'portrait',
  },
  'past-client-08.jpg': {
    title: 'Dashashwamedh Ghat, Varanasi',
    caption: 'Bustling pilgrimage boats and riverside temple spires at the sacred Dashashwamedh Ghat along the Ganges in Varanasi',
    location: 'Varanasi, Uttar Pradesh',
    category: 'Temple Tours',
    aspect: 'portrait',
  },
  'past-client-09.jpg': {
    title: 'Sarnath, Uttar Pradesh',
    caption: 'The revered 80-foot Standing Buddha statue and golden Dharma wheel at the holy Buddhist site of Sarnath',
    location: 'Sarnath, Varanasi',
    category: 'Temple Tours',
    aspect: 'portrait',
  },
  'past-client-10.jpg': {
    title: 'Taj Mahal, Agra',
    caption: 'Our traveler group gathered before the monumental Darwaza-i-Rauza (Great Gate) of the Taj Mahal in Agra',
    location: 'Agra, Uttar Pradesh',
    category: 'Golden Triangle',
    aspect: 'landscape',
  },
};

async function importImages() {
  console.log('--- Starting Import to Supabase Storage: gallery bucket ---');
  console.log('Supabase URL:', supabaseUrl);

  const manifest: any[] = [];

  const filesToUpload: { fileName: string; filePath: string }[] = [];

  // Gather client-travel files
  for (let i = 1; i <= 10; i++) {
    const numStr = String(i).padStart(2, '0');
    const fileName = `client-travel-${numStr}.jpg`;
    const fullPath = path.join(CLIENT_TRAVEL_DIR, fileName);
    if (fs.existsSync(fullPath)) {
      filesToUpload.push({ fileName, filePath: fullPath });
    } else {
      console.warn(`File missing: ${fullPath}`);
    }
  }

  // Gather past-clients files
  for (let i = 1; i <= 10; i++) {
    const numStr = String(i).padStart(2, '0');
    const fileName = `past-client-${numStr}.jpg`;
    const fullPath = path.join(PAST_CLIENTS_DIR, fileName);
    if (fs.existsSync(fullPath)) {
      filesToUpload.push({ fileName, filePath: fullPath });
    } else {
      console.warn(`File missing: ${fullPath}`);
    }
  }

  console.log(`Found ${filesToUpload.length} local images to import.`);

  let uploadSuccessCount = 0;
  let hasRlsError = false;

  for (const item of filesToUpload) {
    const fileBuffer = fs.readFileSync(item.filePath);
    const meta = CLIENT_IMAGE_METADATA[item.fileName] || {
      title: item.fileName,
      caption: 'Authentic travel journey with Jayashakthi Tours',
      location: 'India',
      category: 'Client Experiences',
      aspect: 'landscape',
    };

    const { data: publicUrlData } = supabase.storage
      .from('gallery')
      .getPublicUrl(item.fileName);

    const record = {
      id: `storage-${item.fileName}`,
      name: item.fileName,
      title: meta.title,
      caption: meta.caption,
      location: meta.location,
      tour_name: meta.location,
      category: meta.category,
      aspect: meta.aspect,
      status: 'Published',
      image_url: publicUrlData.publicUrl,
      created_at: new Date().toISOString(),
    };

    manifest.push(record);

    console.log(`Uploading ${item.fileName}...`);
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(item.fileName, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.error(`❌ Failed to upload ${item.fileName}:`, error.message);
      if (error.message?.includes('row-level security') || (error as any).status === 400 || (error as any).statusCode === '403') {
        hasRlsError = true;
      }
    } else {
      console.log(`✅ Successfully uploaded ${item.fileName}`);
      uploadSuccessCount++;
    }
  }

  // Also write the manifest to local public/gallery-manifest.json as fallback
  const localManifestPath = path.resolve(__dirname, '../public/gallery-manifest.json');
  fs.writeFileSync(localManifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Saved local fallback manifest to ${localManifestPath}`);

  // Try uploading gallery-manifest.json to Supabase Storage 'gallery' bucket
  console.log('Uploading gallery-manifest.json to Supabase Storage...');
  const manifestBuffer = Buffer.from(JSON.stringify(manifest, null, 2), 'utf8');
  const { error: manifestErr } = await supabase.storage
    .from('gallery')
    .upload('gallery-manifest.json', manifestBuffer, {
      contentType: 'application/json',
      upsert: true,
    });

  if (manifestErr) {
    console.warn('Note on uploading gallery-manifest.json:', manifestErr.message);
  } else {
    console.log('✅ Successfully uploaded gallery-manifest.json to gallery bucket!');
  }

  console.log(`\nImport Summary: ${uploadSuccessCount}/${filesToUpload.length} images uploaded.`);

  if (hasRlsError) {
    console.log('\n======================================================');
    console.log('⚠️  SUPABASE STORAGE RLS POLICIES REQUIRED');
    console.log('To allow uploads into the "gallery" storage bucket,');
    console.log('run the following SQL statements in Supabase SQL Editor:');
    console.log('------------------------------------------------------');
    console.log(`
DROP POLICY IF EXISTS "Public can view gallery images" ON storage.objects;
CREATE POLICY "Public can view gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Allow upload gallery images" ON storage.objects;
CREATE POLICY "Allow upload gallery images" ON storage.objects
  FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Allow update gallery images" ON storage.objects;
CREATE POLICY "Allow update gallery images" ON storage.objects
  FOR UPDATE TO anon, authenticated USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Allow delete gallery images" ON storage.objects;
CREATE POLICY "Allow delete gallery images" ON storage.objects
  FOR DELETE TO anon, authenticated USING (bucket_id = 'gallery');
    `);
    console.log('======================================================\n');
  }
}

importImages().catch((err) => {
  console.error('Unexpected script error:', err);
});
