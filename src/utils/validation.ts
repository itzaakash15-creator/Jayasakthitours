import { z } from 'zod';

export const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  whatsappNumber: z.string().min(7, { message: 'Please enter a valid WhatsApp number with country code' }),
  country: z.string().min(2, { message: 'Please provide your home country' }),
  startDate: z.string().min(1, { message: 'Please select an estimated start date' }),
  endDate: z.string().min(1, { message: 'Please select an estimated end date' }),
  totalDays: z.union([z.number(), z.string()]).optional(),
  totalNights: z.union([z.number(), z.string()]).optional(),
  adults: z.number().min(1, { message: 'At least 1 adult traveler is required' }),
  children: z.number().min(0),
  childAges: z.array(z.string()).optional(),
  destinations: z.array(z.string()).min(1, { message: 'Please choose at least 1 destination' }),
  customDestination: z.string().optional(),
  accommodation: z.enum(['Budget', 'Standard', 'Premium', 'Luxury', 'Not Sure']),
  transportation: z.enum(['Car', 'Tempo Traveller', 'Bus', 'Flight', 'Not Sure']),
  wantItinerary: z.enum(['Yes', 'No']),
  templeRequirements: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

export type BookingFormSchemaType = z.infer<typeof bookingFormSchema>;

export const reviewFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Valid email address is required' }),
  country: z.string().min(2, { message: 'Country is required' }),
  tripType: z.enum([
    'Family',
    'Group',
    'Solo',
    'Couple',
    'Customized',
    'Temple / Spiritual',
    'Other',
  ]),
  overallRating: z.number().min(1).max(5),
  transportRating: z.number().min(1).max(5),
  hotelRating: z.number().min(1).max(5),
  planningRating: z.number().min(1).max(5),
  coordinationRating: z.number().min(1).max(5),
  recommend: z.enum(['Yes', 'Maybe', 'No']),
  review: z.string().min(15, { message: 'Please share at least a few words about your journey (min 15 chars)' }),
  photoUploaded: z.boolean().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must provide consent for displaying your feedback',
  }),
});

export type ReviewFormSchemaType = z.infer<typeof reviewFormSchema>;
