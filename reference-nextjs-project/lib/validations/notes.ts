import { z } from 'zod';

export const noteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
  priority: z.enum(['low', 'medium', 'high']),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});
