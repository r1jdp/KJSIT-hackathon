-- CreateEnum
CREATE TYPE "emergencytype" AS ENUM ('Medical', 'Police', 'Female', 'Fire', 'Custom SOS');

-- CreateEnum
CREATE TYPE "message" AS ENUM ('Medical Emergency call the Ambulance/come for First Aid help...', 'Emergency Call the Cops ASAP...', 'This is an Emergency Call the Female Help Line...', 'Not a Fire Drill call the Fire Fighters near me...');

-- CreateTable
CREATE TABLE "users" (
    "counsellorid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "emergencytype" "emergencytype",
    "emergencymessage" "message",
    "custommessage" VARCHAR(300),

    CONSTRAINT "users_pkey" PRIMARY KEY ("counsellorid")
);

