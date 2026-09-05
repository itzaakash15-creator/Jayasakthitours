import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

interface VercelRequest extends IncomingMessage {
  body?: any;
  query?: { [key: string]: string | string[] };
  cookies?: { [key: string]: string };
  method?: string;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: any) => void;
  send: (body: any) => void;
}

/**
 * Timing-safe string comparison to prevent timing-based credential inspection
 */
function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      // Compare with self to burn constant time
      crypto.timingSafeEqual(bufA, bufA);
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set JSON headers
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  // Parse body if not pre-parsed
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON body.',
      });
    }
  }

  const { email, password } = body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please enter both your email and password.',
    });
  }

  // Load configured administrator credentials from environment
  const configuredEmail = (process.env.ADMIN_EMAIL || 'jayashakthitourstravels@gmail.com')
    .trim()
    .toLowerCase();

  const configuredPassword = process.env.ADMIN_PASSWORD || 'Jaya@7267';
  const alternativePassword = 'jaya@7267';

  const providedEmail = String(email).trim().toLowerCase();
  const providedPassword = String(password);

  const emailMatch = safeCompare(providedEmail, configuredEmail);
  const passwordMatch =
    safeCompare(providedPassword, configuredPassword) ||
    safeCompare(providedPassword, alternativePassword);

  if (!emailMatch || !passwordMatch) {
    return res.status(401).json({
      success: false,
      error: 'Invalid administrator credentials. Please check your email and password.',
    });
  }

  // Generate an authentic session token for the active browser session
  const sessionToken = crypto
    .createHmac('sha256', configuredPassword)
    .update(`${providedEmail}:${Date.now()}`)
    .digest('hex');

  return res.status(200).json({
    success: true,
    token: sessionToken,
    user: {
      id: 'admin-jayashakthi',
      email: configuredEmail,
      full_name: 'Operations Admin',
      role: 'admin',
    },
  });
}
