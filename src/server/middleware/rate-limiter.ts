/**
 * Rate Limiter Middleware
 * 
 * Implements rate limiting for AI requests and other sensitive endpoints
 * to prevent abuse and ensure fair usage across all users.
 */

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Default configurations for different endpoints
export const RATE_LIMITS = {
  AI_CHAT: { windowMs: 60 * 1000, maxRequests: 20 }, // 20 requests per minute
  AI_CV_GENERATION: { windowMs: 60 * 1000, maxRequests: 5 }, // 5 requests per minute
  AI_COVER_LETTER: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 requests per minute
  JOB_APPLICATION: { windowMs: 60 * 1000, maxRequests: 15 }, // 15 applications per minute
};

export function checkRateLimit(userId: string, config: RateLimitConfig): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const key = userId;
  
  // Initialize or reset if window expired
  if (!store[key] || store[key].resetTime <= now) {
    store[key] = {
      count: 0,
      resetTime: now + config.windowMs,
    };
  }

  const current = store[key];
  const allowed = current.count < config.maxRequests;

  if (allowed) {
    current.count++;
  }

  return {
    allowed,
    remaining: Math.max(0, config.maxRequests - current.count),
    resetTime: current.resetTime,
  };
}

// Cleanup expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const key in store) {
    if (store[key].resetTime <= now) {
      delete store[key];
    }
  }
}, 60 * 1000); // Cleanup every minute
