/*
  Warnings:

  - Made the column `address` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "lastName" DROP DEFAULT,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "address" DROP DEFAULT,
ALTER COLUMN "contact" SET NOT NULL,
ALTER COLUMN "contact" DROP DEFAULT;
