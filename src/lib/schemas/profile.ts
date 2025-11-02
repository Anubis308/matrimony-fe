import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  religion: z.string().min(2, 'Religion is required'),
  community: z.string().min(2, 'Community is required'),
  motherTongue: z.string().min(2, 'Mother tongue is required'),
  maritalStatus: z.enum(['NeverMarried', 'Divorced', 'Widowed', 'AwaitingDivorce']),
  heightInCm: z.number().min(100, 'Height must be at least 100cm').max(250, 'Height must be less than 250cm'),
  education: z.string().min(2, 'Education is required'),
  occupation: z.string().min(2, 'Occupation is required'),
  annualIncome: z.number().optional(),
  country: z.string().min(2, 'Country is required'),
  state: z.string().min(2, 'State is required'),
  city: z.string().min(2, 'City is required'),
  about: z.string().min(10, 'About must be at least 10 characters'),
  familyDetails: z.string().optional(),
  hobbies: z.string().optional(),
});

export const searchSchema = z.object({
  minAge: z.number().optional(),
  maxAge: z.number().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  minHeightInCm: z.number().optional(),
  maxHeightInCm: z.number().optional(),
  religion: z.string().optional(),
  community: z.string().optional(),
  maritalStatus: z.enum(['NeverMarried', 'Divorced', 'Widowed', 'AwaitingDivorce']).optional(),
  education: z.string().optional(),
  occupation: z.string().optional(),
  minAnnualIncome: z.number().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pageNumber: z.number().default(1),
  pageSize: z.number().default(20),
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type SearchInput = z.infer<typeof searchSchema>;

