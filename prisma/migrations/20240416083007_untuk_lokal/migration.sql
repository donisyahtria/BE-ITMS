/*
  Warnings:

  - You are about to drop the `Parameter_Bobot_Sumbu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Parameter_Bobot_Sumbu" DROP CONSTRAINT "Parameter_Bobot_Sumbu_id_komite_talent_fkey";

-- DropForeignKey
ALTER TABLE "Parameter_Bobot_Sumbu" DROP CONSTRAINT "Parameter_Bobot_Sumbu_id_kriteria_penilaian_fkey";

-- DropTable
DROP TABLE "Parameter_Bobot_Sumbu";

-- CreateTable
CREATE TABLE "Skor_Performance" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "skor" DOUBLE PRECISION,
    "Berlaku_Mulai" DATE,
    "Berlaku_Hingga" DATE,

    CONSTRAINT "Skor_Performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jenis_Kompetensi" (
    "id" SERIAL NOT NULL,
    "jenis_Kompetensi" VARCHAR(20) NOT NULL,

    CONSTRAINT "Jenis_Kompetensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referensi_Kompetensi_Technical" (
    "id" SERIAL NOT NULL,
    "kodekomphardsoft" VARCHAR(10) NOT NULL,
    "namakomphardsoft" VARCHAR(255) NOT NULL,
    "desckomphardsoft" VARCHAR(1000) NOT NULL,
    "kodejeniskomp" INTEGER NOT NULL,

    CONSTRAINT "Referensi_Kompetensi_Technical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kompetensi_Hardsoft_Rumpun" (
    "id" SERIAL NOT NULL,
    "kode_rumpun_jabatan" INTEGER NOT NULL,
    "id_kompetensi_technical" INTEGER NOT NULL,
    "Basic" INTEGER NOT NULL,
    "Intermediate" INTEGER NOT NULL,
    "Advanced" INTEGER NOT NULL,

    CONSTRAINT "Kompetensi_Hardsoft_Rumpun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skor_Technical" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "id_Kompetensi" INTEGER NOT NULL,
    "id_jenis_kompetensi" INTEGER NOT NULL,
    "skor" DOUBLE PRECISION NOT NULL,
    "Berlaku_Mulai" DATE NOT NULL,
    "Berlaku_Hingga" DATE NOT NULL,

    CONSTRAINT "Skor_Technical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referensi_Kompetensi_Leadership" (
    "id" SERIAL NOT NULL,
    "kodekomplead" VARCHAR(10) NOT NULL,
    "namakomplead" VARCHAR(255) NOT NULL,
    "desckomphardlead" VARCHAR(1000) NOT NULL,

    CONSTRAINT "Referensi_Kompetensi_Leadership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skor_Leadership" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "id_Kompetensi" INTEGER NOT NULL,
    "skor" DOUBLE PRECISION NOT NULL,
    "Berlaku_Mulai" DATE NOT NULL,
    "Berlaku_Hingga" DATE NOT NULL,

    CONSTRAINT "Skor_Leadership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skor_BUMN" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "avg_skor" DOUBLE PRECISION,
    "Berlaku_Mulai" DATE,
    "Berlaku_Hingga" DATE,

    CONSTRAINT "skor_BUMN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skor_LA" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "skor" DOUBLE PRECISION,
    "Berlaku_Mulai" DATE,
    "Berlaku_Hingga" DATE,

    CONSTRAINT "skor_LA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skor_Potensi" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "skor" DOUBLE PRECISION,
    "Berlaku_Mulai" DATE,
    "Berlaku_Hingga" DATE,

    CONSTRAINT "skor_Potensi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skor_Performance" ADD CONSTRAINT "Skor_Performance_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referensi_Kompetensi_Technical" ADD CONSTRAINT "Referensi_Kompetensi_Technical_kodejeniskomp_fkey" FOREIGN KEY ("kodejeniskomp") REFERENCES "Jenis_Kompetensi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kompetensi_Hardsoft_Rumpun" ADD CONSTRAINT "Kompetensi_Hardsoft_Rumpun_kode_rumpun_jabatan_fkey" FOREIGN KEY ("kode_rumpun_jabatan") REFERENCES "Referensi_Rumpun_Jabatan"("kode_rumpun_jabatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kompetensi_Hardsoft_Rumpun" ADD CONSTRAINT "Kompetensi_Hardsoft_Rumpun_id_kompetensi_technical_fkey" FOREIGN KEY ("id_kompetensi_technical") REFERENCES "Referensi_Kompetensi_Technical"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skor_Technical" ADD CONSTRAINT "Skor_Technical_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skor_Technical" ADD CONSTRAINT "Skor_Technical_id_Kompetensi_fkey" FOREIGN KEY ("id_Kompetensi") REFERENCES "Referensi_Kompetensi_Technical"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skor_Technical" ADD CONSTRAINT "Skor_Technical_id_jenis_kompetensi_fkey" FOREIGN KEY ("id_jenis_kompetensi") REFERENCES "Jenis_Kompetensi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skor_Leadership" ADD CONSTRAINT "Skor_Leadership_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skor_Leadership" ADD CONSTRAINT "Skor_Leadership_id_Kompetensi_fkey" FOREIGN KEY ("id_Kompetensi") REFERENCES "Referensi_Kompetensi_Leadership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skor_BUMN" ADD CONSTRAINT "skor_BUMN_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skor_LA" ADD CONSTRAINT "skor_LA_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skor_Potensi" ADD CONSTRAINT "skor_Potensi_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;
