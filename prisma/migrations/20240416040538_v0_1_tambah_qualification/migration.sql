-- CreateTable
CREATE TABLE "Parameter_Bobot_Sumbu" (
    "id" SERIAL NOT NULL,
    "id_komite_talent" INTEGER NOT NULL,
    "id_kriteria_penilaian" INTEGER NOT NULL,
    "bobot" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Parameter_Bobot_Sumbu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Parameter_Bobot_Sumbu" ADD CONSTRAINT "Parameter_Bobot_Sumbu_id_komite_talent_fkey" FOREIGN KEY ("id_komite_talent") REFERENCES "Referensi_Komite_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameter_Bobot_Sumbu" ADD CONSTRAINT "Parameter_Bobot_Sumbu_id_kriteria_penilaian_fkey" FOREIGN KEY ("id_kriteria_penilaian") REFERENCES "Kriteria_Penilaian"("id_kriteria_penilaian") ON DELETE RESTRICT ON UPDATE CASCADE;
