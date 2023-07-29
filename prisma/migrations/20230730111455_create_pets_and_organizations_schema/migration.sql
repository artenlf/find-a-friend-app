-- CreateEnum
CREATE TYPE "Type" AS ENUM ('dog', 'cat', 'other');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('newborn', 'young', 'adult', 'senior');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('small', 'medium', 'large');

-- CreateEnum
CREATE TYPE "Energy_Level" AS ENUM ('veryLow', 'low', 'medium', 'high', 'veryHigh');

-- CreateEnum
CREATE TYPE "Independency_Level" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('small', 'medium', 'large');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energy_level" "Energy_Level" NOT NULL,
    "independency_level" "Independency_Level" NOT NULL,
    "environment" "Environment" NOT NULL,
    "pictures" TEXT[],
    "requirements" TEXT[],
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
