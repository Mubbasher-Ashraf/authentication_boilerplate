import { rateLimit } from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 5 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  statusCode: 429, // send 
  message: 'Too many requests, please try again later.'
});