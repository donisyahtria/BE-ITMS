-- AddForeignKey
ALTER TABLE "Parameter_Talent_Qualification" ADD CONSTRAINT "Parameter_Talent_Qualification_id_kriteria_penilaian_fkey" FOREIGN KEY ("id_kriteria_penilaian") REFERENCES "Kriteria_Penilaian"("id_kriteria_penilaian") ON DELETE RESTRICT ON UPDATE CASCADE;
