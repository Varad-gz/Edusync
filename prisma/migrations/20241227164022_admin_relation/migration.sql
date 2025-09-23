/*
  Warnings:

  - Added the required column `adminId` to the `Instructor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "adminId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "adminId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
