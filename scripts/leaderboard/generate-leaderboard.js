const firstNames = require("./first-names.json");
const placeNames = require("./place-names.json");
const fs = require("fs");

// Create a mock leaderboard with 10,000 entries
const leaderboard = Array.from({ length: 10000 }, (_, i) => ({
  id: crypto.randomUUID(),
  name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    placeNames[Math.floor(Math.random() * placeNames.length)]
  }`,
  score: Math.floor(Math.random() * 3000),
}));

// Write to leaderboard.json
fs.writeFileSync("leaderboard.json", JSON.stringify(leaderboard, null, 2));
