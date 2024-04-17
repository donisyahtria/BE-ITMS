/*
  Warnings:

  - You are about to drop the column `eventtalenid` on the `Talent_Qualification` table. All the data in the column will be lost.
  - Added the required column `eventtalentid` to the `Talent_Qualification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Talent_Qualification" DROP CONSTRAINT "Talent_Qualification_eventtalenid_fkey";

-- AlterTable
ALTER TABLE "Talent_Qualification" DROP COLUMN "eventtalenid",
ADD COLUMN     "eventtalentid" INTEGER NOT NULL,
ADD COLUMN     "komite_unit" CHAR(9);

-- AddForeignKey
ALTER TABLE "Talent_Qualification" ADD CONSTRAINT "Talent_Qualification_eventtalentid_fkey" FOREIGN KEY ("eventtalentid") REFERENCES "Event_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
