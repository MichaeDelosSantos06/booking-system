import { createClient } from "redis";
import { env } from "./env.js";

const redisClientInstance = createClient({
  url: env.REDIS_URL,
});

redisClientInstance.on("error", (error) => {
  console.error("Redis Client Failed:", error);
});

export const connectRedis = async (): Promise<boolean> => {
  try {
    await redisClientInstance.connect();
    console.log("Redis connected successfully.");
    return true;
  } catch (error) {
    console.error(
      "Redis connection failed. Continuing without Redis cache.",
      error,
    );
    return false;
  }
};

const safeRedisOperation = async <T>(
  operation: string,
  callback: () => Promise<T>,
  fallback: T,
): Promise<T> => {
  try {
    return await callback();
  } catch (error) {
    console.error(`Redis ${operation} failed:`, error);
    return fallback;
  }
};

const redisClient = {
  ...redisClientInstance,
  connect: connectRedis,
  get: async (key: string) =>
    safeRedisOperation("GET", () => redisClientInstance.get(key), null),
  set: async (...args: Parameters<typeof redisClientInstance.set>) =>
    safeRedisOperation(
      "SET",
      () => redisClientInstance.set(...args),
      "OK" as never,
    ),
  del: async (...args: Parameters<typeof redisClientInstance.del>) =>
    safeRedisOperation("DEL", () => redisClientInstance.del(...args), 0),
  scan: async (...args: Parameters<typeof redisClientInstance.scan>) =>
    safeRedisOperation(
      "SCAN",
      () => redisClientInstance.scan(...args),
      { cursor: "0", keys: [] } as Awaited<
        ReturnType<typeof redisClientInstance.scan>
      >,
    ),
  keys: async (...args: Parameters<typeof redisClientInstance.keys>) =>
    safeRedisOperation(
      "KEYS",
      () => redisClientInstance.keys(...args),
      [] as string[],
    ),
};

export default redisClient;
