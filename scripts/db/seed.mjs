import { client as PrismaClient } from "../../src/config/prisma.mjs";

// Add first user
await PrismaClient.user.create({
  data: {
    username: "omar",
    name: "omar",
    // cqqzq
    password: "$2b$10$1sTvRkjN1rHi2ybLFSkV5uXhFC4728EeposYzudz7d7CZmlhSqncS",
  },
});
