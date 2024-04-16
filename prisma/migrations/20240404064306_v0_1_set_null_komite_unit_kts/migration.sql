-- DropForeignKey
ALTER TABLE "Kandidat_Talent_dan_Source" DROP CONSTRAINT "Kandidat_Talent_dan_Source_komite_unit_fkey";

-- AlterTable
ALTER TABLE "Kandidat_Talent_dan_Source" ALTER COLUMN "komite_unit" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Kandidat_Talent_dan_Source" ADD CONSTRAINT "Kandidat_Talent_dan_Source_komite_unit_fkey" FOREIGN KEY ("komite_unit") REFERENCES "Karyawan"("nippos") ON DELETE SET NULL ON UPDATE CASCADE;
