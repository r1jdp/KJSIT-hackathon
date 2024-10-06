const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    const data = await prisma.users.findMany({});
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function post(data) {
  try {
    await prisma.users.deleteMany({});
    const postedData = await prisma.users.create({
      data: {
        emergencytype: data.emergencytype, // Ensure this is correct
        emergencymessage: data.emergencymessage,
        custommessage: data.custommessage,
      },
    });
    return postedData;
  } catch (error) {
    console.error("Error in post function:", error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  main,
  post,
};
