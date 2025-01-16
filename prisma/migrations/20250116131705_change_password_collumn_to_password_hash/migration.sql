-- CreateEnum
CREATE TYPE "Specie" AS ENUM ('DOG', 'CAT', 'BIRD', 'OTHER');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" DECIMAL(65,30) NOT NULL,
    "whatsapp" DECIMAL(65,30) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "specie" "Specie" NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energy_level" DECIMAL(65,30) NOT NULL,
    "independency_level" DECIMAL(65,30) NOT NULL,
    "space_requirement" DECIMAL(65,30) NOT NULL,
    "photos" TEXT[],
    "adoption_requirements" TEXT[],
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
