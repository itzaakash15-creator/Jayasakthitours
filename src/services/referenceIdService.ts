/**
 * Jayashakthi Tours & Travels - JST Reference ID System
 *
 * Format Specification: JST-YY-XXXX
 * - JST: Jayashakthi Tours identifier
 * - YY: Two-digit current year (e.g. '26' for 2026)
 * - XXXX: Sequential enquiry number padded to 4 digits (e.g. '0001')
 *
 * Examples:
 * - JST-26-0001
 * - JST-26-0002
 * - JST-26-0003
 */

const SEQUENCE_STORAGE_PREFIX = 'jst_reference_seq_';

/**
 * Returns the 2-digit representation of the current year (e.g., '26' for 2026)
 */
export function getCurrentYearSuffix(): string {
  return new Date().getFullYear().toString().slice(-2);
}

/**
 * Formats a given sequential number and year suffix into the official JST Reference ID
 */
export function formatReferenceId(seqNumber: number, yearSuffix?: string): string {
  const yy = yearSuffix || getCurrentYearSuffix();
  const padded = Math.max(1, seqNumber).toString().padStart(4, '0');
  return `JST-${yy}-${padded}`;
}

/**
 * Validates whether a string matches the official JST Reference ID format (e.g., JST-26-0001)
 */
export function isValidReferenceId(id: string): boolean {
  if (!id) return false;
  return /^JST-\d{2}-\d{4}$/i.test(id.trim());
}

/**
 * Parses a reference ID into its year suffix and sequential integer number
 */
export function parseReferenceId(id: string): { year: string; seq: number } | null {
  if (!id) return null;
  const match = id.trim().match(/^JST-(\d{2})-(\d{4})$/i);
  if (!match) return null;
  return {
    year: match[1],
    seq: parseInt(match[2], 10),
  };
}

/**
 * Computes the next unique, sequential JST Reference ID.
 *
 * Algorithm:
 * 1. Determines current 2-digit year (e.g., '26').
 * 2. Scans all existing booking records for the highest sequence number in the current year.
 * 3. Checks localStorage sequence tracker to ensure monotonic increment (prevents reuse if records are removed).
 * 4. Advances sequence by 1 and pads to 4 digits.
 *
 * Supabase Readiness:
 * When Supabase is connected, this logic can query a PostgreSQL sequence:
 * `SELECT nextval('jst_booking_seq')` or a database trigger function.
 */
export function generateNextReferenceId(
  existingBookings?: Array<{ id: string }>
): string {
  const currentYear = getCurrentYearSuffix();
  const storageKey = `${SEQUENCE_STORAGE_PREFIX}${currentYear}`;

  let highestSeq = 0;

  // 1. Inspect existing booking records in memory / storage
  if (existingBookings && existingBookings.length > 0) {
    for (const b of existingBookings) {
      const parsed = parseReferenceId(b.id);
      if (parsed && parsed.year === currentYear) {
        if (parsed.seq > highestSeq) {
          highestSeq = parsed.seq;
        }
      }
    }
  }

  // 2. Check persisted sequence counter in browser storage
  let storedCounter = 0;
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const rawStored = window.localStorage.getItem(storageKey);
      if (rawStored) {
        const val = parseInt(rawStored, 10);
        if (!isNaN(val) && val > 0) {
          storedCounter = val;
        }
      }
    } catch {
      // Ignore in non-browser or restricted storage
    }
  }

  // 3. Determine the next sequential number
  const nextSeq = Math.max(highestSeq, storedCounter) + 1;

  // 4. Save advanced counter to prevent duplicates
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(storageKey, nextSeq.toString());
    } catch {
      // Ignore in non-browser or restricted storage
    }
  }

  return formatReferenceId(nextSeq, currentYear);
}

/**
 * Flexible search matcher for Reference IDs.
 * Supports exact match, normalized lowercase, and partial digit search:
 * - "JST-26-0001" -> matches
 * - "jst-26-0001" -> matches
 * - "0001" -> matches
 * - "26-0001" -> matches
 */
export function matchesReferenceSearch(query: string, referenceId: string): boolean {
  if (!query || !referenceId) return false;
  const q = query.trim().toLowerCase();
  const ref = referenceId.trim().toLowerCase();

  if (ref.includes(q)) return true;

  // Search without prefix (e.g. user types "26-0001" or "0001")
  const refWithoutPrefix = ref.replace(/^jst-/, '');
  if (refWithoutPrefix.includes(q)) return true;

  return false;
}
