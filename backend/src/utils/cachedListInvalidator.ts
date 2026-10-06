import redisClient from "../config/redis.js";

const invalidateCacheByPattern = async (pattern: string): Promise<void> => {
  let cursor = "0";

  do {
    const result = await redisClient.scan(cursor, {
      MATCH: pattern,
      COUNT: 100,
    });

    cursor = result.cursor;

    if (result.keys.length > 0) {
      await redisClient.del(result.keys);
    }
  } while (cursor !== "0");
};

export default invalidateCacheByPattern;
