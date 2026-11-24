const app = require("./app");
const env = require("./config/env");
const prisma = require("./config/prisma");

const PORT = env.port || 3000;

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ Prisma connected to MySQL");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1);
  }
}

startServer();