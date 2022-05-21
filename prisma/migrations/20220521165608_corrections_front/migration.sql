/*
  Warnings:

  - You are about to drop the column `wasAskedID` on the `relations` table. All the data in the column will be lost.
  - You are about to drop the column `whoAskedID` on the `relations` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `userNotifications` table. All the data in the column will be lost.
  - You are about to drop the column `likesManga` on the `userPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `userPreferences` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `userNotifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `userPreferences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wasAskedId` to the `relations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whoAskedId` to the `relations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `userNotifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `userPreferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "relations" DROP CONSTRAINT "relations_wasAskedID_fkey";

-- DropForeignKey
ALTER TABLE "relations" DROP CONSTRAINT "relations_whoAskedID_fkey";

-- DropForeignKey
ALTER TABLE "userNotifications" DROP CONSTRAINT "userNotifications_userID_fkey";

-- DropForeignKey
ALTER TABLE "userPreferences" DROP CONSTRAINT "userPreferences_userID_fkey";

-- AlterTable
ALTER TABLE "relations" DROP COLUMN "wasAskedID",
DROP COLUMN "whoAskedID",
ADD COLUMN     "wasAskedId" INTEGER NOT NULL,
ADD COLUMN     "whoAskedId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "userNotifications" DROP COLUMN "userID",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "userPreferences" DROP COLUMN "likesManga",
DROP COLUMN "userID",
ADD COLUMN     "likesMangas" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userNotifications_userId_key" ON "userNotifications"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userPreferences_userId_key" ON "userPreferences"("userId");

-- AddForeignKey
ALTER TABLE "userPreferences" ADD CONSTRAINT "userPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userNotifications" ADD CONSTRAINT "userNotifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_whoAskedId_fkey" FOREIGN KEY ("whoAskedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_wasAskedId_fkey" FOREIGN KEY ("wasAskedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
