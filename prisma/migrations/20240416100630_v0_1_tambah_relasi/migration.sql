-- AlterTable
ALTER TABLE "Talent_Profile" ALTER COLUMN "komite_unit" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Talent_Qualification" ADD CONSTRAINT "Talent_Qualification_komite_unit_fkey" FOREIGN KEY ("komite_unit") REFERENCES "Karyawan"("nippos") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent_Profile" ADD CONSTRAINT "Talent_Profile_komite_unit_fkey" FOREIGN KEY ("komite_unit") REFERENCES "Karyawan"("nippos") ON DELETE SET NULL ON UPDATE CASCADE;
