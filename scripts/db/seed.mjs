import { client as PrismaClient } from "../../src/config/prisma.mjs";

//Add Roles
const masterRol = await PrismaClient.rol.create({
  data: {
    name: "Maestro"
  }
});

const trainerRol = await PrismaClient.rol.create({
  data: {
    name: "Aprendiz"
  }
});


// Add first Ma
await PrismaClient.user.create({
  data: {
    username: "omar",
    name: "omar",
    // cqqzq
    password: "$2b$10$1sTvRkjN1rHi2ybLFSkV5uXhFC4728EeposYzudz7d7CZmlhSqncS",
    rol: {
      connect: { id: masterRol.id}
    }
  },
});
