import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { clientPhotos } from '../data/clientPhotos';
import { generateNextReferenceId, isValidReferenceId } from '../services/referenceIdService';

// =============================================================================
// TYPES & SCHEMAS
// =============================================================================

export type BookingStatus =
  | 'New'
  | 'Contacted'
  | 'Quotation Sent'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export type GalleryCategory =
  | 'Client Experiences'
  | 'Temple Tours'
  | 'South India'
  | 'Kerala'
  | 'Rajasthan'
  | 'Golden Triangle'
  | 'Cab & Travel'
  | 'Nature & Scenic'
  | 'Other';

export interface BookingRecord {
  id: string; // JST-YY-XXXX (e.g. JST-26-0001)
  reference_id?: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  phone: string;
  whatsapp_number?: string;
  email: string;
  pickup_location: string;
  destination: string;
  travel_date: string;
  trip_type: string;
  service_type: string;
  tour_package?: string;
  estimated_budget?: string;
  adults: number;
  children: number;
  total_travellers: number;
  preferred_vehicle: string;
  accommodation_preference: string;
  tour_guide_requirement: string;
  special_requests: string;
  additional_notes: string;
  booking_status: BookingStatus;
  admin_notes: string;
}

export interface GalleryPhotoRecord {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  caption: string;
  location: string;
  tour_name?: string;
  category: GalleryCategory;
  image_url: string;
  storage_path?: string;
  aspect: 'landscape' | 'portrait' | 'square';
  status: 'Published' | 'Hidden';
  uploaded_by?: string;
}

export interface ReviewRecord {
  id: string; // uuid
  created_at: string;
  customer_name: string;
  rating: number; // 1-5
  review_text: string;
  approved: boolean;
}

// =============================================================================
// SUPABASE CLIENT CONFIGURATION
// =============================================================================

// Official Supabase credentials for Jayashakthi Tours & Travels
const DEFAULT_SUPABASE_URL = 'https://ouxbzcsgrfxlgcyegtwa.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_gh-Ta8gDHh2hfUtII8sUgg_NXQvqc8F';

export const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL)) ||
  (typeof (globalThis as any).process !== 'undefined' && (globalThis as any).process.env && ((globalThis as any).process.env.VITE_SUPABASE_URL || (globalThis as any).process.env.SUPABASE_URL)) ||
  DEFAULT_SUPABASE_URL;

export const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY)) ||
  (typeof (globalThis as any).process !== 'undefined' && (globalThis as any).process.env && ((globalThis as any).process.env.VITE_SUPABASE_PUBLISHABLE_KEY || (globalThis as any).process.env.VITE_SUPABASE_ANON_KEY || (globalThis as any).process.env.SUPABASE_ANON_KEY)) ||
  DEFAULT_SUPABASE_ANON_KEY;

// If in Node/SSR environment without native WebSocket, polyfill globalThis.WebSocket to avoid runtime crash
if (typeof window === 'undefined' && typeof (globalThis as any).WebSocket === 'undefined') {
  (globalThis as any).WebSocket = class DummyWebSocket {};
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
  },
});

// =============================================================================
// INITIAL SEED DATA FOR GALLERY (LOCAL PERSISTENCE & FALLBACK)
// =============================================================================

const STORAGE_KEY_GALLERY = 'jst_gallery_v2';

// Seed initial gallery photos from existing verified clientPhotos
export const defaultSeedGalleryPhotos: GalleryPhotoRecord[] = clientPhotos.map((photo) => {
  let cat: GalleryCategory = 'Client Experiences';
  if (photo.categories?.includes('Temple Visits')) cat = 'Temple Tours';
  else if (photo.categories?.includes('South India')) cat = 'South India';
  else if (photo.categories?.includes('Rajasthan')) cat = 'Rajasthan';

  return {
    id: `gal-${photo.id}`,
    created_at: new Date(Date.now() - Number(photo.id || 1) * 86400 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    title: photo.destination || 'South India Journey',
    caption: photo.caption || photo.destination || 'Authentic client journey with Jayashakthi Tours',
    location: photo.destination || 'South India',
    tour_name: photo.destination || 'Custom South India Tour',
    category: cat,
    image_url: photo.image,
    aspect: photo.aspect || 'landscape',
    status: 'Published',
    uploaded_by: 'Jayashakthi Operations',
  };
});

const inMemoryStore: Record<string, any> = {};

// Helper for local storage retrieval with safety
function getStoredItems<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    if (!inMemoryStore[key]) {
      inMemoryStore[key] = fallback;
    }
    return inMemoryStore[key];
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[Supabase Storage] Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function saveStoredItems<T>(key: string, items: T[]): void {
  inMemoryStore[key] = items;
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(`jst:${key}_updated`, { detail: items }));
  } catch (err) {
    console.error(`[Supabase Storage] Error writing to ${key}:`, err);
  }
}

// =============================================================================
// DATABASE PAYLOAD ADAPTERS (MATCHING SUPABASE TABLE SCHEMA)
// =============================================================================

/**
 * Strips client-only / generated columns before inserting to Supabase.
 * - 'id' stores the Reference ID (e.g. 'JST-26-0001').
 * - 'total_travellers' is GENERATED ALWAYS in PostgreSQL (must NOT be in payload).
 * - 'reference_id' is mapped to 'id'.
 * - 'email' must be a non-null string to satisfy PostgreSQL NOT NULL constraint.
 */
export function toSupabaseBookingPayload(record: BookingRecord) {
  return {
    id: record.id,
    created_at: record.created_at || new Date().toISOString(),
    updated_at: record.updated_at || new Date().toISOString(),
    full_name: record.full_name || 'Anonymous Guest',
    phone: record.phone || '',
    email: record.email ? record.email.trim() : '',
    pickup_location: record.pickup_location || '',
    destination: record.destination || '',
    travel_date: record.travel_date || '',
    trip_type: record.trip_type || 'Family Vacation',
    service_type: record.service_type || 'Tour Package',
    tour_package: record.tour_package || null,
    estimated_budget: record.estimated_budget || null,
    adults: Number(record.adults) || 1,
    children: Number(record.children) || 0,
    preferred_vehicle: record.preferred_vehicle || 'Toyota Innova Crysta (AC)',
    accommodation_preference: record.accommodation_preference || 'Deluxe 4-Star / Heritage Stays',
    tour_guide_requirement: record.tour_guide_requirement || 'Yes — Sightseeing & Temple Guide',
    special_requests: record.special_requests || '',
    additional_notes: record.additional_notes || '',
    booking_status: record.booking_status || 'New',
    admin_notes: record.admin_notes || '',
  };
}

/**
 * Reconstructs a full typed BookingRecord from a Supabase row.
 */
export function fromSupabaseBookingRow(row: any): BookingRecord {
  const adults = Number(row.adults) || 0;
  const children = Number(row.children) || 0;
  return {
    id: row.id,
    reference_id: row.id,
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
    full_name: row.full_name || 'Guest',
    phone: row.phone || '',
    whatsapp_number: row.phone || '',
    email: row.email || '',
    pickup_location: row.pickup_location || '',
    destination: row.destination || '',
    travel_date: row.travel_date || '',
    trip_type: row.trip_type || 'Family Vacation',
    service_type: row.service_type || 'Tour Package',
    tour_package: row.tour_package || '',
    estimated_budget: row.estimated_budget || '',
    adults,
    children,
    total_travellers:
      Number(row.total_travellers) || (adults + children),
    preferred_vehicle: row.preferred_vehicle || 'Toyota Innova Crysta (AC)',
    accommodation_preference: row.accommodation_preference || '',
    tour_guide_requirement: row.tour_guide_requirement || '',
    special_requests: row.special_requests || '',
    additional_notes: row.additional_notes || '',
    booking_status: (row.booking_status as BookingStatus) || 'New',
    admin_notes: row.admin_notes || '',
  };
}

// =============================================================================
// BOOKINGS SERVICE API (DIRECT SUPABASE PERSISTENCE & FETCHING)
// =============================================================================

/**
 * Fetches all bookings directly from Supabase bookings table.
 * Does NOT use mock data or local storage fallbacks.
 */
export async function fetchBookings(): Promise<BookingRecord[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase] fetchBookings error:', error);
      return [];
    }

    if (data && Array.isArray(data)) {
      return data.map(fromSupabaseBookingRow);
    }

    return [];
  } catch (err) {
    console.error('[Supabase] fetchBookings unexpected error:', err);
    return [];
  }
}

/**
 * Inserts a customer booking enquiry directly into the Supabase bookings table.
 * Strips generated/missing columns and does not use .select() to prevent RLS representation failure.
 */
export async function createBooking(
  bookingInput: Omit<BookingRecord, 'id' | 'created_at' | 'updated_at'> & {
    id?: string;
    reference_id?: string;
  }
): Promise<BookingRecord> {
  const newRefId =
    bookingInput.id && isValidReferenceId(bookingInput.id)
      ? bookingInput.id
      : bookingInput.reference_id && isValidReferenceId(bookingInput.reference_id)
      ? bookingInput.reference_id
      : generateNextReferenceId();

  const now = new Date().toISOString();

  const newRecord: BookingRecord = {
    ...bookingInput,
    id: newRefId,
    reference_id: newRefId,
    created_at: now,
    updated_at: now,
    email: bookingInput.email?.trim() || '',
    total_travellers: (Number(bookingInput.adults) || 0) + (Number(bookingInput.children) || 0),
    booking_status: bookingInput.booking_status || 'New',
    admin_notes: bookingInput.admin_notes || '',
  };

  const payload = toSupabaseBookingPayload(newRecord);

  // [DEBUG BOOKING] Sending to Supabase
  console.log('[DEBUG BOOKING] Sending to Supabase', payload);

  let insertResponse: any;
  try {
    insertResponse = await supabase
      .from('bookings')
      .insert([payload])
      .select();
  } catch (caughtErr: any) {
    // [DEBUG BOOKING] Error
    console.error('[DEBUG BOOKING] Error', caughtErr);
    throw caughtErr;
  }

  const { data, error, status, statusText } = insertResponse || {};

  // [DEBUG BOOKING] Supabase response
  console.log('[DEBUG BOOKING] Supabase response', {
    data,
    error,
    status,
    statusText,
  });

  if (error) {
    // [DEBUG BOOKING] Error
    console.error('[DEBUG BOOKING] Error', error);

    // Collision handling: if ID already exists, advance sequence and retry once
    if (error.code === '23505') {
      console.warn('[Supabase] ID collision detected in database, advancing sequence...');
      const nextId = generateNextReferenceId();
      const resolvedRecord = { ...newRecord, id: nextId, reference_id: nextId };
      const retryPayload = toSupabaseBookingPayload(resolvedRecord);
      console.log('[DEBUG 4-RETRY] Retrying insert with advanced ID payload:', retryPayload);
      const { data: retryData, error: retryErr } = await supabase.from('bookings').insert([retryPayload]);
      console.log('[DEBUG 5-RETRY] Retry insert result:', { retryData, retryErr });
      if (retryErr) {
        console.error('[DEBUG 6] Retry insert failed:', retryErr);
        throw new Error(retryErr.message || 'Failed to save booking to Supabase database.');
      }
      console.info('[Supabase] Successfully saved booking with advanced ID:', nextId);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('jst:bookings_updated', { detail: resolvedRecord }));
        window.dispatchEvent(new CustomEvent('jst:jst_bookings_v3_updated', { detail: resolvedRecord }));
      }
      return resolvedRecord;
    }

    throw new Error(error.message || `Database error (${error.code || 'UNKNOWN'}): ${JSON.stringify(error)}`);
  }

  console.info('[Supabase] Successfully inserted booking to Supabase table:', newRefId);

  // Notify listeners across the app (Admin Portal, CRM)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:bookings_updated', { detail: newRecord }));
    window.dispatchEvent(new CustomEvent('jst:jst_bookings_v3_updated', { detail: newRecord }));
  }

  return newRecord;
}

export async function updateBookingStatus(
  id: string,
  newStatus: BookingStatus
): Promise<BookingRecord | null> {
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('bookings')
    .update({ booking_status: newStatus, updated_at: now })
    .eq('id', id);

  if (error) {
    console.error(`[Supabase] Failed to update status of ${id}:`, error);
    throw new Error(error.message || 'Failed to update booking status in Supabase');
  }

  console.info(`[Supabase] Successfully updated status of ${id} to ${newStatus}`);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:bookings_updated'));
    window.dispatchEvent(new CustomEvent('jst:jst_bookings_v3_updated'));
  }
  return null;
}

export async function updateBookingNotes(
  id: string,
  notes: string
): Promise<BookingRecord | null> {
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('bookings')
    .update({ admin_notes: notes, updated_at: now })
    .eq('id', id);

  if (error) {
    console.error(`[Supabase] Failed to update notes of ${id}:`, error);
    throw new Error(error.message || 'Failed to update notes in Supabase');
  }

  console.info(`[Supabase] Successfully updated notes of ${id}`);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:bookings_updated'));
    window.dispatchEvent(new CustomEvent('jst:jst_bookings_v3_updated'));
  }
  return null;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) {
    console.error('[Supabase] Failed to delete booking:', error);
    throw new Error(error.message || 'Failed to delete booking from Supabase');
  }

  console.info(`[Supabase] Successfully deleted booking ${id}`);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:bookings_updated'));
    window.dispatchEvent(new CustomEvent('jst:jst_bookings_v3_updated'));
  }
  return true;
}

// =============================================================================
// GALLERY PHOTOS SERVICE API (PURE SUPABASE STORAGE INTEGRATION)
// =============================================================================

export const GALLERY_STORAGE_BUCKET = 'gallery';
const STORAGE_MANIFEST_FILE = 'gallery-manifest.json';

export interface UploadGalleryResult {
  publicUrl: string;
  storagePath: string;
}

/**
 * Extracts a clean filename from a path or URL.
 */
function getStorageFileBasename(urlOrPath: string): string {
  if (!urlOrPath) return '';
  const clean = urlOrPath.split('?')[0];
  const parts = clean.split('/');
  return (parts[parts.length - 1] || '').trim();
}

/**
 * Helper to get a public URL for any object in the 'gallery' Supabase Storage bucket.
 */
export function getGalleryStoragePublicUrl(fileName: string): string {
  if (!fileName) return '';
  if (isSupabaseConfigured && supabase) {
    const { data } = supabase.storage.from(GALLERY_STORAGE_BUCKET).getPublicUrl(fileName);
    if (data?.publicUrl) return data.publicUrl;
  }
  return `${supabaseUrl}/storage/v1/object/public/${GALLERY_STORAGE_BUCKET}/${fileName}`;
}

/**
 * Internal helper to save updated manifest to Supabase Storage.
 */
async function saveManifestToStorage(photos: GalleryPhotoRecord[]): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    const jsonString = JSON.stringify(photos, null, 2);
    // In browser environment, use Blob; in Node/SSR environment, use globalThis Buffer if available
    const payload =
      typeof Blob !== 'undefined'
        ? new Blob([jsonString], { type: 'application/json' })
        : typeof (globalThis as any).Buffer !== 'undefined'
        ? (globalThis as any).Buffer.from(jsonString, 'utf8')
        : jsonString;

    const { error } = await supabase.storage
      .from(GALLERY_STORAGE_BUCKET)
      .upload(STORAGE_MANIFEST_FILE, payload, {
        contentType: 'application/json',
        upsert: true,
      });

    if (error) {
      console.warn('[Supabase Storage] Note on saving gallery manifest:', error.message);
    }
  } catch (err) {
    console.warn('[Supabase Storage] Failed to update storage manifest:', err);
  }
}

/**
 * Seeds and initializes gallery photos. Retained for backwards compatibility.
 */
export async function seedExistingGalleryPhotos(): Promise<GalleryPhotoRecord[]> {
  return fetchGalleryPhotos();
}

/**
 * Fetches all gallery photos from Supabase Storage 'gallery' bucket.
 * 1. Checks Supabase Storage objects list.
 * 2. Checks gallery-manifest.json in storage for rich metadata.
 * 3. Pairs any newly uploaded files in storage with generated photo records.
 * 4. Merges with default clientPhotos so all 20 verified photos are always present.
 */
export async function fetchGalleryStoragePhotos(): Promise<GalleryPhotoRecord[]> {
  let manifestPhotos: GalleryPhotoRecord[] = [];
  let storageFileNames: string[] = [];

  if (isSupabaseConfigured && supabase) {
    // 1. Try to read gallery-manifest.json from Supabase Storage
    try {
      const { data: fileData, error: downloadErr } = await supabase.storage
        .from(GALLERY_STORAGE_BUCKET)
        .download(STORAGE_MANIFEST_FILE);

      if (!downloadErr && fileData) {
        const text = await fileData.text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          manifestPhotos = parsed;
        }
      }
    } catch (manifestErr) {
      // Fall through to public fetch or storage list
    }

    // Fallback: try fetching the manifest via its public URL
    if (manifestPhotos.length === 0) {
      try {
        const manifestUrl = getGalleryStoragePublicUrl(STORAGE_MANIFEST_FILE);
        const res = await fetch(`${manifestUrl}?t=${Date.now()}`);
        if (res.ok) {
          const parsed = await res.json();
          if (Array.isArray(parsed)) {
            manifestPhotos = parsed;
          }
        }
      } catch (fetchErr) {
        // Fall through
      }
    }

    // 2. List all files directly in the Supabase Storage 'gallery' bucket
    try {
      const { data: objects, error: listErr } = await supabase.storage
        .from(GALLERY_STORAGE_BUCKET)
        .list('', {
          limit: 200,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (!listErr && objects && Array.isArray(objects)) {
        storageFileNames = objects
          .map((o) => o.name)
          .filter(
            (name) =>
              name &&
              !name.startsWith('.') &&
              name !== STORAGE_MANIFEST_FILE &&
              !name.includes('placeholder')
          );
      }
    } catch (listErr) {
      console.warn('[Supabase Storage] Could not list storage bucket files:', listErr);
    }
  }

  // Also check local storage items
  const localItems = getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, []);

  // Use a map to track unique photos by filename or ID
  const photoMap = new Map<string, GalleryPhotoRecord>();

  // 1. First populate with default 20 verified client photos
  for (const seed of defaultSeedGalleryPhotos) {
    const base = getStorageFileBasename(seed.image_url);
    photoMap.set(base || seed.id, seed);
  }

  // 2. Overlay manifest photos (if stored in Supabase Storage)
  for (const photo of manifestPhotos) {
    if (photo && photo.id) {
      const base = getStorageFileBasename(photo.image_url || photo.storage_path || '');
      const key = base || photo.id;
      photoMap.set(key, photo);
    }
  }

  // 3. Overlay local storage items (for immediate updates made in Admin)
  for (const photo of localItems) {
    if (photo && photo.id) {
      const base = getStorageFileBasename(photo.image_url || photo.storage_path || '');
      const key = base || photo.id;
      photoMap.set(key, photo);
    }
  }

  // 4. Synthesize records for any files discovered directly in Supabase Storage
  for (const fileName of storageFileNames) {
    const base = getStorageFileBasename(fileName);
    const existing = photoMap.get(base);
    const publicUrl = getGalleryStoragePublicUrl(fileName);

    if (existing) {
      // Update image_url to serve directly from Supabase Storage CDN
      photoMap.set(base, {
        ...existing,
        image_url: publicUrl,
        storage_path: fileName,
      });
    } else {
      // Discovered new file in Supabase Storage without manifest entry
      const cleanTitle = base
        .replace(/\.[^/.]+$/, '')
        .replace(/^\d+[-_]/, '')
        .replace(/[-_]/g, ' ')
        .trim();

      const newRecord: GalleryPhotoRecord = {
        id: `storage-${base}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        title: cleanTitle ? cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1) : 'Travel Photo',
        caption: 'Client journey memory with Jayashakthi Tours & Travels',
        location: 'India',
        category: 'Client Experiences',
        image_url: publicUrl,
        storage_path: fileName,
        aspect: 'landscape',
        status: 'Published',
        uploaded_by: 'Operations Admin',
      };
      photoMap.set(base, newRecord);
    }
  }

  const combinedList = Array.from(photoMap.values());
  saveStoredItems(STORAGE_KEY_GALLERY, combinedList);
  return combinedList;
}

/**
 * Fetches all gallery photos for the Admin Portal (both Published and Hidden).
 */
export async function fetchGalleryPhotos(): Promise<GalleryPhotoRecord[]> {
  return fetchGalleryStoragePhotos();
}

/**
 * Fetches only Published photos from Supabase Storage 'gallery' bucket.
 * Public gallery components merge these records with the original website photos.
 */
export async function fetchPublishedGalleryPhotos(): Promise<GalleryPhotoRecord[]> {
  const allPhotos = await fetchGalleryStoragePhotos();
  return allPhotos.filter(
    (photo) =>
      photo &&
      photo.status === 'Published' &&
      photo.image_url &&
      typeof photo.image_url === 'string' &&
      photo.image_url.trim().length > 0
  );
}

/**
 * Creates and registers a new gallery photo uploaded into Supabase Storage.
 */
export async function createGalleryPhoto(
  photoInput: Omit<GalleryPhotoRecord, 'id' | 'created_at' | 'updated_at'> & { id?: string }
): Promise<GalleryPhotoRecord> {
  const newId = photoInput.id || `gal-${Date.now()}`;
  const now = new Date().toISOString();

  const newRecord: GalleryPhotoRecord = {
    ...photoInput,
    id: newId,
    created_at: now,
    updated_at: now,
    status: photoInput.status || 'Published',
    aspect: photoInput.aspect || 'landscape',
    storage_path: photoInput.storage_path || '',
  };

  // Update local storage
  const existing = getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, defaultSeedGalleryPhotos);
  const updated = [newRecord, ...existing.filter((g) => g.id !== newId)];
  saveStoredItems(STORAGE_KEY_GALLERY, updated);

  // Sync updated manifest to Supabase Storage
  saveManifestToStorage(updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:gallery_updated', { detail: newRecord }));
    window.dispatchEvent(new CustomEvent('jst:jst_gallery_v2_updated', { detail: newRecord }));
  }

  return newRecord;
}

/**
 * Updates a gallery photo's details or publishing status in Supabase Storage.
 */
export async function updateGalleryPhoto(
  id: string,
  updates: Partial<Omit<GalleryPhotoRecord, 'id' | 'created_at'>>
): Promise<GalleryPhotoRecord | null> {
  const now = new Date().toISOString();
  const existing = getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, defaultSeedGalleryPhotos);

  let updatedRecord: GalleryPhotoRecord | null = null;
  const nextList = existing.map((g) => {
    if (g.id === id) {
      updatedRecord = { ...g, ...updates, updated_at: now };
      return updatedRecord;
    }
    return g;
  });

  if (!updatedRecord) return null;

  saveStoredItems(STORAGE_KEY_GALLERY, nextList);
  saveManifestToStorage(nextList);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:gallery_updated', { detail: updatedRecord }));
    window.dispatchEvent(new CustomEvent('jst:jst_gallery_v2_updated', { detail: updatedRecord }));
  }

  return updatedRecord;
}

/**
 * Deletes a gallery photo file directly from Supabase Storage 'gallery' bucket
 * and removes its metadata from the manifest.
 */
export async function deleteGalleryPhoto(id: string, storagePath?: string): Promise<boolean> {
  const existing = getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, defaultSeedGalleryPhotos);
  const target = existing.find((p) => p.id === id);

  let fileToDelete = storagePath || target?.storage_path;
  if (!fileToDelete && target?.image_url) {
    fileToDelete = getStorageFileBasename(target.image_url);
  }
  if (!fileToDelete && id.startsWith('storage-')) {
    fileToDelete = id.replace('storage-', '');
  }

  // Remove file from Supabase Storage 'gallery' bucket
  if (isSupabaseConfigured && supabase && fileToDelete) {
    try {
      const { data, error } = await supabase.storage
        .from(GALLERY_STORAGE_BUCKET)
        .remove([fileToDelete]);

      if (error) {
        console.warn(`[Supabase Storage] Note on removing file ${fileToDelete}:`, error.message);
      } else {
        console.info(`[Supabase Storage] Successfully removed file from gallery bucket:`, data);
      }
    } catch (err) {
      console.warn('[Supabase Storage] Exception removing file from gallery bucket:', err);
    }
  }

  const nextList = existing.filter(
    (g) => g.id !== id && (!fileToDelete || g.storage_path !== fileToDelete)
  );
  saveStoredItems(STORAGE_KEY_GALLERY, nextList);
  saveManifestToStorage(nextList);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:gallery_updated', { detail: { id, deleted: true } }));
    window.dispatchEvent(new CustomEvent('jst:jst_gallery_v2_updated', { detail: { id, deleted: true } }));
  }

  return true;
}

/**
 * Uploads an image file directly into the Supabase Storage 'gallery' bucket.
 * Returns the CDN publicUrl and storagePath.
 */
export async function uploadGalleryImage(file: File): Promise<UploadGalleryResult> {
  const fileExt = file.name.split('.').pop() || 'jpg';
  const cleanBaseName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 30);
  const fileName = `${Date.now()}-${cleanBaseName}.${fileExt}`;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(GALLERY_STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (!uploadError && uploadData) {
        const publicUrl = getGalleryStoragePublicUrl(fileName);
        return {
          publicUrl,
          storagePath: fileName,
        };
      } else if (uploadError) {
        console.warn('[Supabase Storage] Upload error to gallery bucket:', uploadError);
      }
    } catch (err) {
      console.warn('[Supabase Storage] Fallback in uploadGalleryImage:', err);
    }
  }

  // Local fallback: convert to base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve({
          publicUrl: reader.result,
          storagePath: fileName,
        });
      } else {
        reject(new Error('Failed to read image file'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// =============================================================================
// REVIEWS SERVICE API (DIRECT SUPABASE PERSISTENCE)
// =============================================================================

/**
 * Fetches all approved reviews from Supabase for public website display.
 * Only returns reviews where approved = true. Does NOT use fallback or mock data.
 */
export async function fetchApprovedReviews(): Promise<ReviewRecord[]> {
  try {
    console.log('[DEBUG REVIEW] Public Website: Querying supabase.from("reviews").select("*").eq("approved", true)...');
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DEBUG REVIEW] Public Website: Error fetching approved reviews:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return [];
    }

    if (!data || !Array.isArray(data)) {
      return [];
    }

    const sanitized: ReviewRecord[] = data.filter(Boolean).map((r: any) => ({
      id: String(r?.id || `rev-${Date.now()}`),
      created_at: String(r?.created_at || new Date().toISOString()),
      customer_name: String(r?.customer_name || r?.name || 'Traveler'),
      rating: Number(r?.rating) || 5,
      review_text: String(r?.review_text || r?.review || r?.text || ''),
      approved: Boolean(r?.approved),
    }));

    console.log('[DEBUG REVIEW] Public Website: Successfully fetched approved reviews count:', sanitized.length, sanitized);
    return sanitized;
  } catch (err) {
    console.error('[DEBUG REVIEW] Public Website: Unexpected error fetching approved reviews:', err);
    return [];
  }
}

/**
 * Fetches all reviews (both approved and pending) from Supabase for Admin Portal.
 * Does NOT use fallback or mock data.
 */
export async function fetchAllReviews(): Promise<ReviewRecord[]> {
  try {
    console.log('[DEBUG REVIEW] Admin Portal: Querying supabase.from("reviews").select("*")...');
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DEBUG REVIEW] Admin Portal: Error fetching all reviews:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return [];
    }

    if (!data || !Array.isArray(data)) {
      return [];
    }

    const sanitized: ReviewRecord[] = data.filter(Boolean).map((r: any) => ({
      id: String(r?.id || `rev-${Date.now()}`),
      created_at: String(r?.created_at || new Date().toISOString()),
      customer_name: String(r?.customer_name || r?.name || 'Traveler'),
      rating: Number(r?.rating) || 5,
      review_text: String(r?.review_text || r?.review || r?.text || ''),
      approved: Boolean(r?.approved),
    }));

    console.log('[DEBUG REVIEW] Admin Portal: Successfully fetched reviews count:', sanitized.length, sanitized);
    return sanitized;
  } catch (err) {
    console.error('[DEBUG REVIEW] Admin Portal: Unexpected error fetching all reviews:', err);
    return [];
  }
}

/**
 * Inserts a customer review into Supabase with approved = false.
 */
export async function createReview(input: {
  customer_name: string;
  rating: number;
  review_text: string;
}): Promise<ReviewRecord> {
  const payload = {
    customer_name: input.customer_name.trim(),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    review_text: input.review_text.trim(),
    approved: false, // strictly pending approval by default
  };

  // [DEBUG REVIEW] Sending to Supabase
  console.log('[DEBUG REVIEW] Sending to Supabase', payload);

  // Direct insertion into the Supabase reviews table
  let insertRes: any;
  try {
    insertRes = await supabase
      .from('reviews')
      .insert({
        customer_name: payload.customer_name,
        rating: payload.rating,
        review_text: payload.review_text,
        approved: false,
      })
      .select();
  } catch (caughtErr: any) {
    // [DEBUG REVIEW] Error
    console.error('[DEBUG REVIEW] Error', caughtErr);
    throw caughtErr;
  }

  const { data, error } = insertRes || {};

  // [DEBUG REVIEW] Supabase response
  console.log('[DEBUG REVIEW] Supabase response', { data, error });

  if (error) {
    // [DEBUG REVIEW] Error
    console.error('[DEBUG REVIEW] Error', error);
    throw new Error(error.message || `Supabase Insert Error: ${error.code}`);
  }

  if (!data || data.length === 0) {
    // [DEBUG REVIEW] Error
    console.error('[DEBUG REVIEW] Error', 'No data returned from insert');
    throw new Error('Supabase did not return any confirmed created row. Review was not saved.');
  }

  const createdRow = data[0] as ReviewRecord;
  console.log('[DEBUG REVIEW] 5. Successfully inserted review into Supabase:', createdRow);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:reviews_updated'));
  }

  return createdRow;
}

/**
 * Approves a pending review in Supabase (sets approved = true).
 */
export async function approveReview(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('reviews')
    .update({ approved: true })
    .eq('id', id);

  if (error) {
    console.error(`[Supabase] Failed to approve review ${id}:`, error);
    throw new Error(error.message || 'Failed to approve review');
  }

  console.info(`[Supabase] Successfully approved review: ${id}`);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:reviews_updated'));
  }
  return true;
}

/**
 * Deletes a review record permanently from Supabase.
 */
export async function deleteReview(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`[Supabase] Failed to delete review ${id}:`, error);
    throw new Error(error.message || 'Failed to delete review');
  }

  console.info(`[Supabase] Successfully deleted review: ${id}`);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:reviews_updated'));
  }
  return true;
}
