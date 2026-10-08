import redisClient from "../config/redis.js";

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const cachedValue = await redisClient.get(key);
    if (cachedValue === null) {
      return null;
    }

    try {
      return JSON.parse(cachedValue) as T;
    } catch (error) {
      console.error(`Redis cache value parsing failed for key "${key}":`, error);
      return null;
    }
  } catch (error) {
    console.error(`Redis GET failed for key "${key}":`, error);
    return null;
  }
};

export const setCache = async <T>(
  key: string,
  value: T,
  ttlSeconds: number,
): Promise<void> => {
  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: ttlSeconds,
    });
  } catch (error) {
    console.error(`Redis SET failed for key "${key}":`, error);
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error(`Redis DEL failed for key "${key}":`, error);
  }
};
