import rateLimit from 'express-rate-limit';

const FIFTEEN_MINUTES_IN_MILLISECONDS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 12;

export const rateLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES_IN_MILLISECONDS,
  max: MAX_REQUESTS_PER_WINDOW,
});
