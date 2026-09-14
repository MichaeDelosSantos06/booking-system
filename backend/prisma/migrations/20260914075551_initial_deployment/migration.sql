/*
  Warnings:

  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,scheduleId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scheduleId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Completed', 'Confirmed', 'Cancelled');

-- AlterEnum
ALTER TYPE "ScheduleStat" ADD VALUE 'Full';

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_classId_fkey";

-- DropIndex
DROP INDEX "Booking_userId_classId_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "scheduleId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'Confirmed';

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_scheduleId_key" ON "Booking"("userId", "scheduleId");

-- CreateIndex
CREATE INDEX "Schedule_status_date_idx" ON "Schedule"("status", "date");

-- CreateIndex
CREATE INDEX "Schedule_location_idx" ON "Schedule"("location");

-- CreateIndex
CREATE INDEX "Schedule_classId_idx" ON "Schedule"("classId");

-- CreateIndex
CREATE INDEX "Schedule_trainerId_idx" ON "Schedule"("trainerId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
