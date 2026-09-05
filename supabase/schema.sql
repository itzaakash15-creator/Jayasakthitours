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
  email TEXT NOT NULL,

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
-- 4. GALLERY PHOTOS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_photos (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,

  title TEXT NOT NULL,
  caption TEXT DEFAULT '',
  location TEXT NOT NULL,
  tour_name TEXT DEFAULT '',
  category TEXT DEFAULT 'Client Experiences' NOT NULL,

  image_url TEXT NOT NULL,
  storage_path TEXT DEFAULT '',
  aspect TEXT DEFAULT 'landscape',

  status TEXT DEFAULT 'Published' NOT NULL,
  uploaded_by TEXT DEFAULT 'Operations Admin'
);

-- Indexing for fast public gallery queries
CREATE INDEX IF NOT EXISTS idx_gallery_status ON public.gallery_photos(status);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery_photos(category);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON public.gallery_photos(created_at DESC);

-- =============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an authorized admin
CREATE OR REPLACE FUNCTION public.is_authorized_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ADMIN USERS POLICIES
CREATE POLICY "Admins can view admin users list" ON public.admin_users
  FOR SELECT TO authenticated USING (public.is_authorized_admin());

-- BOOKINGS POLICIES:
-- 1. Public website visitors CAN submit booking enquiries
CREATE POLICY "Public visitors can insert bookings" ON public.bookings
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 2. ONLY authenticated authorized admins can VIEW booking enquiries
CREATE POLICY "Admins can view bookings" ON public.bookings
  FOR SELECT TO authenticated USING (public.is_authorized_admin());

-- 3. ONLY authenticated authorized admins can UPDATE booking status or notes
CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE TO authenticated USING (public.is_authorized_admin());

-- 4. ONLY authenticated authorized admins can DELETE bookings
CREATE POLICY "Admins can delete bookings" ON public.bookings
  FOR DELETE TO authenticated USING (public.is_authorized_admin());

-- GALLERY POLICIES:
-- 1. Anyone (public or authenticated) can view Published photos
CREATE POLICY "Public can view published gallery photos" ON public.gallery_photos
  FOR SELECT USING (status = 'Published' OR public.is_authorized_admin());

-- 2. ONLY authorized admins can INSERT gallery photos
CREATE POLICY "Admins can insert gallery photos" ON public.gallery_photos
  FOR INSERT TO authenticated WITH CHECK (public.is_authorized_admin());

-- 3. ONLY authorized admins can UPDATE gallery photos
CREATE POLICY "Admins can update gallery photos" ON public.gallery_photos
  FOR UPDATE TO authenticated USING (public.is_authorized_admin());

-- 4. ONLY authorized admins can DELETE gallery photos
CREATE POLICY "Admins can delete gallery photos" ON public.gallery_photos
  FOR DELETE TO authenticated USING (public.is_authorized_admin());

-- =============================================================================
-- 6. STORAGE BUCKET POLICIES (Run in Supabase Storage or SQL Editor)
-- =============================================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true)
-- ON CONFLICT (id) DO NOTHING;

-- Public read for gallery objects
-- CREATE POLICY "Public can view gallery images" ON storage.objects
--   FOR SELECT USING (bucket_id = 'gallery');

-- Only authenticated admins can upload images
-- CREATE POLICY "Admins can upload gallery images" ON storage.objects
--   FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery' AND public.is_authorized_admin());

-- Only authenticated admins can delete images
-- CREATE POLICY "Admins can delete gallery images" ON storage.objects
--   FOR DELETE TO authenticated USING (bucket_id = 'gallery' AND public.is_authorized_admin());
