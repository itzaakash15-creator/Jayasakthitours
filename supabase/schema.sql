-- =============================================================================
-- JAYASHAKTHI TOURS & TRAVELS — SUPABASE DATABASE & SECURITY SCHEMA
-- Execute this script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- =============================================================================

-- 1. Create enum types for structured statuses
CREATE TYPE booking_status_enum AS ENUM (
  'New',
  'Contacted',
  'Quotation Sent',
  'Confirmed',
  'Completed',
  'Cancelled'
);

CREATE TYPE service_type_enum AS ENUM (
  'Tour Package',
  'Cab / Chauffeur',
  'Site Guide',
  'Custom Trip'
);

CREATE TYPE photo_category_enum AS ENUM (
  'Client Experiences',
  'Temple Tours',
  'South India',
  'Kerala',
  'Rajasthan',
  'Golden Triangle',
  'Cab & Travel',
  'Nature & Scenic',
  'Other'
);

CREATE TYPE photo_status_enum AS ENUM (
  'Published',
  'Hidden'
);

-- =============================================================================
-- 2. ADMIN USERS & ROLES TABLE
-- Connects directly to Supabase Auth (auth.users)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'staff')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- 3. BOOKING ENQUIRIES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Customer & Contact Details
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,

  -- Trip & Route Details
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  travel_date TEXT NOT NULL,
  trip_type TEXT DEFAULT 'Family Vacation',

  -- Service & Package
  service_type TEXT NOT NULL,
  tour_package TEXT,
  estimated_budget TEXT,

  -- Travellers Breakdown
  adults INTEGER DEFAULT 2 NOT NULL,
  children INTEGER DEFAULT 0 NOT NULL,
  total_travellers INTEGER GENERATED ALWAYS AS (adults + children) STORED,

  -- Logistics & Preferences
  preferred_vehicle TEXT DEFAULT 'Toyota Innova Crysta (AC)',
  accommodation_preference TEXT DEFAULT 'Deluxe 4-Star / Heritage Stays',
  tour_guide_requirement TEXT DEFAULT 'Yes — Sightseeing & Temple Guide',
  special_requests TEXT DEFAULT '',
  additional_notes TEXT DEFAULT '',

  -- CRM Management (Internal)
  booking_status TEXT DEFAULT 'New' NOT NULL,
  admin_notes TEXT DEFAULT ''
);

-- Indexing for fast search and filtering
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON public.bookings(phone);

-- =============================================================================
-- 4. GALLERY STORAGE ARCHITECTURE (Pure Supabase Storage, No Database Table Needed)
-- =============================================================================
-- The gallery is stored and managed directly in the Supabase Storage 'gallery' bucket.
-- Any previous gallery_photos table can be dropped:
DROP TABLE IF EXISTS public.gallery_photos CASCADE;

-- =============================================================================
-- 6. STORAGE BUCKET POLICIES (Run in Supabase Storage or SQL Editor)
-- =============================================================================
-- Create or configure public 'gallery' storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE 
SET public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Public read for gallery objects
DROP POLICY IF EXISTS "Public can view gallery images" ON storage.objects;
CREATE POLICY "Public can view gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

-- Allow uploading gallery images
DROP POLICY IF EXISTS "Admins can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload gallery images" ON storage.objects;
CREATE POLICY "Allow upload gallery images" ON storage.objects
  FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'gallery');

-- Allow updating gallery images
DROP POLICY IF EXISTS "Allow update gallery images" ON storage.objects;
CREATE POLICY "Allow update gallery images" ON storage.objects
  FOR UPDATE TO anon, authenticated USING (bucket_id = 'gallery');

-- Allow deleting gallery images
DROP POLICY IF EXISTS "Admins can delete gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete gallery images" ON storage.objects;
CREATE POLICY "Allow delete gallery images" ON storage.objects
  FOR DELETE TO anon, authenticated USING (bucket_id = 'gallery');

-- =============================================================================
-- 7. CUSTOMER REVIEWS TABLE & POLICIES
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT NOT NULL,
  approved BOOLEAN DEFAULT false NOT NULL
);

-- Indexing for fast approved reviews querying
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON public.reviews(approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 1. Public visitors can submit reviews (strictly defaulting to approved = false)
DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;
CREATE POLICY "Public can insert reviews" ON public.reviews
  FOR INSERT TO anon, authenticated WITH CHECK (approved = false);

-- 2. Select reviews:
-- Public queries filter with .eq('approved', true). Admin Portal queries all reviews.
DROP POLICY IF EXISTS "Allow select reviews" ON public.reviews;
CREATE POLICY "Allow select reviews" ON public.reviews
  FOR SELECT TO anon, authenticated USING (true);

-- 3. Allow update reviews (Admin moderation: approve / publish)
DROP POLICY IF EXISTS "Allow update reviews" ON public.reviews;
CREATE POLICY "Allow update reviews" ON public.reviews
  FOR UPDATE TO anon, authenticated USING (true);

-- 4. Allow delete reviews (Admin moderation: delete review)
DROP POLICY IF EXISTS "Allow delete reviews" ON public.reviews;
CREATE POLICY "Allow delete reviews" ON public.reviews
  FOR DELETE TO anon, authenticated USING (true);
