const { PrismaClient } = require("@prisma/client");
const firstNames = require("./first-names.json");
const placeNames = require("./place-names.json");
const crypto = require("crypto");

const prisma = new PrismaClient();

// Create a mock leaderboard with 10,000 entries
const leaderboard = Array.from({ length: 10000 }, (_, i) => ({
  id: crypto.randomUUID(),
  name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    placeNames[Math.floor(Math.random() * placeNames.length)]
  }`,
  score: Math.floor(Math.random() * 3000),
}));

async function main() {
  for (const entry of leaderboard) {
    await prisma.score.create({
      data: {
        id: entry.id,
        name: entry.name,
        score: entry.score,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
