require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
});

async function test() {
  try {
    await prisma.$connect();

    console.log("✅ Prisma connected");

    const result = await prisma.user.findFirst();

    console.log("✅ Query worked");
    console.log(result);
  } catch (error) {
    console.error("❌ Prisma connection/query failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

test();