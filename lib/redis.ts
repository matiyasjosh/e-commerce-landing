import Redis from 'ioredis';

// Use REDIS_URL if provided, otherwise default to localhost on the standard Redis port 6379
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
export const redis = new Redis(redisUrl);

// Attach an error handler so Redis errors are logged but don't crash the process with an unhandled event
redis.on('error', (err) => {
	// Keep message concise; ioredis may emit connection errors when Redis is down.
	// We log them so the API route can fall back to DB if necessary.
	// eslint-disable-next-line no-console
	console.error('[ioredis] Redis client error:', err);
});