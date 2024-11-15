import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379, // Default Redis port
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (error) => {
  console.error('Redis connection error:', error);
});

export { redis };
