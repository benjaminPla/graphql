import { createClient } from "redis";

const redis = createClient();
try {
  await redis.connect();
} catch (error) {
  console.log("redis connection error");
  process.exit(error);
}
