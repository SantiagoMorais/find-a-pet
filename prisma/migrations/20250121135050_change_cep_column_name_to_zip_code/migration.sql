/*
  Warnings:

  - You are about to drop the column `cep` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `zip_code` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "cep",
ADD COLUMN     "zip_code" DECIMAL(65,30) NOT NULL;
