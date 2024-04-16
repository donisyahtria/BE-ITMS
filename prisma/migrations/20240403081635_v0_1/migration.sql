-- CreateTable
CREATE TABLE "Karyawan" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "nik" CHAR(16) NOT NULL,
    "kode_jabatan" INTEGER NOT NULL,
    "kode_bagian" INTEGER NOT NULL,
    "rumpun_jabatan" INTEGER,
    "personal_level" CHAR(2),
    "job_level" CHAR(2),
    "kode_nopend" VARCHAR(7),
    "tipe_jabatan" INTEGER NOT NULL,
    "kode_status_kerja" INTEGER NOT NULL,
    "status_hukdis" CHAR(1) NOT NULL,
    "email" VARCHAR(255),

    CONSTRAINT "Karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referensi_Kantor" (
    "id" SERIAL NOT NULL,
    "nopend" VARCHAR(7) NOT NULL,
    "nama_kantor" VARCHAR(255) NOT NULL,
    "nopend_atasan" VARCHAR(7),
    "Id_Wilayah" CHAR(2) NOT NULL,
    "kode_kelas_kantor" CHAR(2) NOT NULL,
    "status_aktif" CHAR(1) NOT NULL,

    CONSTRAINT "Referensi_Kantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referensi_Kelas_Kantor" (
    "id" SERIAL NOT NULL,
    "kode_kelas_kantor" CHAR(2) NOT NULL,
    "jenis_kantor" VARCHAR(255) NOT NULL,
    "kelas_kantor" CHAR(1) NOT NULL,

    CONSTRAINT "Referensi_Kelas_Kantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipe_Jabatan" (
    "id" SERIAL NOT NULL,
    "nama_tipe_jabatan" VARCHAR(255) NOT NULL,

    CONSTRAINT "Tipe_Jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status_Kerja" (
    "id" SERIAL NOT NULL,
    "nama_status_kerja" VARCHAR(25) NOT NULL,

    CONSTRAINT "Status_Kerja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role_Karyawan" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "Role_Karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role_User" (
    "id" SERIAL NOT NULL,
    "nama_role" VARCHAR(25) NOT NULL,

    CONSTRAINT "Role_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role_Akses" (
    "id" SERIAL NOT NULL,
    "id_role_user" INTEGER NOT NULL,
    "hak_akses" VARCHAR(50) NOT NULL,

    CONSTRAINT "Role_Akses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referensi_Jabatan" (
    "id" SERIAL NOT NULL,
    "kode_jabatan" CHAR(3) NOT NULL,
    "nama_jabatan" VARCHAR(125) NOT NULL,

    CONSTRAINT "Referensi_Jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referensi_Bagian" (
    "id" SERIAL NOT NULL,
    "id_external" INTEGER NOT NULL,
    "nama_bagian" VARCHAR(255) NOT NULL,
    "status_aktif" VARCHAR(1) NOT NULL,

    CONSTRAINT "Referensi_Bagian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referensi_Rumpun_Jabatan" (
    "id" SERIAL NOT NULL,
    "kode_rumpun_jabatan" INTEGER NOT NULL,
    "nama_rumpun_jabatan" VARCHAR(50) NOT NULL,
    "status_aktif" CHAR(1) NOT NULL,

    CONSTRAINT "Referensi_Rumpun_Jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Underperson_Komite_Unit" (
    "id" SERIAL NOT NULL,
    "kode_jabatan_atasan" INTEGER NOT NULL,
    "kode_bagian_atasan" INTEGER NOT NULL,
    "kode_jabatan_bawahan" INTEGER NOT NULL,
    "kode_bagian_bawahan" INTEGER NOT NULL,

    CONSTRAINT "Underperson_Komite_Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Komite_Talent" (
    "id" SERIAL NOT NULL,
    "id_komite_talent" INTEGER NOT NULL,
    "posisi_komite_talent" VARCHAR(255) NOT NULL,
    "kode_jabatan" INTEGER NOT NULL,
    "kode_bagian" INTEGER NOT NULL,

    CONSTRAINT "Komite_Talent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter_Komite_Talent" (
    "id" SERIAL NOT NULL,
    "id_komite_talent" INTEGER NOT NULL,
    "job_level" CHAR(2) NOT NULL,

    CONSTRAINT "Parameter_Komite_Talent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referensi_Komite_Talent" (
    "id" SERIAL NOT NULL,
    "tipe_komite_talent" VARCHAR(50) NOT NULL,

    CONSTRAINT "Referensi_Komite_Talent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter_Talent_Qualification" (
    "id" SERIAL NOT NULL,
    "id_komite_talent" INTEGER NOT NULL,
    "id_kriteria_penilaian" INTEGER NOT NULL,
    "skor_minimal" INTEGER NOT NULL,

    CONSTRAINT "Parameter_Talent_Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter_Talent_Cluster" (
    "id" SERIAL NOT NULL,
    "id_komite_talent" INTEGER NOT NULL,
    "id_kriteria_penilaian" INTEGER NOT NULL,
    "bobot" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Parameter_Talent_Cluster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kriteria_Penilaian" (
    "id_kriteria_penilaian" SERIAL NOT NULL,
    "nama_kriteria_penilaian" VARCHAR(50) NOT NULL,

    CONSTRAINT "Kriteria_Penilaian_pkey" PRIMARY KEY ("id_kriteria_penilaian")
);

-- CreateTable
CREATE TABLE "Event_Talent" (
    "id" SERIAL NOT NULL,
    "nama_event" VARCHAR(100) NOT NULL,
    "nippos_ketua_komite" CHAR(9) NOT NULL,
    "kode_rumpun_jabatan" INTEGER NOT NULL,
    "tipe_komite_talent" INTEGER NOT NULL,
    "kuota" INTEGER,
    "deskripsi" VARCHAR(255) NOT NULL,
    "tanggal_mulai" DATE NOT NULL,
    "tanggal_selesai" DATE NOT NULL,
    "evenstatus_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "createdBy" VARCHAR(9) NOT NULL,

    CONSTRAINT "Event_Talent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Komite_Talent_Event" (
    "id" SERIAL NOT NULL,
    "eventid" INTEGER NOT NULL,
    "nippos" CHAR(9) NOT NULL,

    CONSTRAINT "Komite_Talent_Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event_Pertanyaan" (
    "id" SERIAL NOT NULL,
    "eventid" INTEGER NOT NULL,
    "id_pertanyaan" INTEGER NOT NULL,

    CONSTRAINT "Event_Pertanyaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referensi_Pertanyaan" (
    "id" SERIAL NOT NULL,
    "pertanyaan" VARCHAR(255) NOT NULL,

    CONSTRAINT "Referensi_Pertanyaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event_Status" (
    "id" SERIAL NOT NULL,
    "nama_status" VARCHAR(50) NOT NULL,

    CONSTRAINT "Event_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job_Level_Event" (
    "id" SERIAL NOT NULL,
    "eventid" INTEGER NOT NULL,
    "level_jabatan" CHAR(2) NOT NULL,

    CONSTRAINT "Job_Level_Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deadline_Event_Step" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "deadline_1" DATE,
    "deadline_2" DATE,
    "deadline_3" DATE,
    "deadline_4" DATE,
    "deadline_5" DATE,
    "deadline_6" DATE,

    CONSTRAINT "Deadline_Event_Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talent_Qualification" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "eventtalenid" INTEGER NOT NULL,
    "id_kriteria_penilaian" INTEGER NOT NULL,
    "skor" INTEGER NOT NULL,
    "berlaku_mulai" DATE NOT NULL,
    "berlaku_hingga" DATE NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Talent_Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kandidat_Talent_dan_Source" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "eventtalentid" INTEGER NOT NULL,
    "status_talensource" BOOLEAN NOT NULL,
    "komite_unit" CHAR(9) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Kandidat_Talent_dan_Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talent_Profile" (
    "id" SERIAL NOT NULL,
    "nippos" CHAR(9) NOT NULL,
    "eventtalentid" INTEGER NOT NULL,
    "komite_unit" CHAR(9) NOT NULL,
    "pakta_integritas" BOOLEAN NOT NULL,
    "commitmenletter" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Talent_Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_nippos_key" ON "Karyawan"("nippos");

-- CreateIndex
CREATE UNIQUE INDEX "Referensi_Kantor_nopend_key" ON "Referensi_Kantor"("nopend");

-- CreateIndex
CREATE UNIQUE INDEX "Referensi_Kelas_Kantor_kode_kelas_kantor_key" ON "Referensi_Kelas_Kantor"("kode_kelas_kantor");

-- CreateIndex
CREATE UNIQUE INDEX "Referensi_Jabatan_kode_jabatan_key" ON "Referensi_Jabatan"("kode_jabatan");

-- CreateIndex
CREATE UNIQUE INDEX "Referensi_Bagian_id_external_key" ON "Referensi_Bagian"("id_external");

-- CreateIndex
CREATE UNIQUE INDEX "Referensi_Rumpun_Jabatan_kode_rumpun_jabatan_key" ON "Referensi_Rumpun_Jabatan"("kode_rumpun_jabatan");

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_kode_jabatan_fkey" FOREIGN KEY ("kode_jabatan") REFERENCES "Referensi_Jabatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_kode_bagian_fkey" FOREIGN KEY ("kode_bagian") REFERENCES "Referensi_Bagian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_rumpun_jabatan_fkey" FOREIGN KEY ("rumpun_jabatan") REFERENCES "Referensi_Rumpun_Jabatan"("kode_rumpun_jabatan") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_kode_nopend_fkey" FOREIGN KEY ("kode_nopend") REFERENCES "Referensi_Kantor"("nopend") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_tipe_jabatan_fkey" FOREIGN KEY ("tipe_jabatan") REFERENCES "Tipe_Jabatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_kode_status_kerja_fkey" FOREIGN KEY ("kode_status_kerja") REFERENCES "Status_Kerja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referensi_Kantor" ADD CONSTRAINT "Referensi_Kantor_kode_kelas_kantor_fkey" FOREIGN KEY ("kode_kelas_kantor") REFERENCES "Referensi_Kelas_Kantor"("kode_kelas_kantor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role_Karyawan" ADD CONSTRAINT "Role_Karyawan_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role_Karyawan" ADD CONSTRAINT "Role_Karyawan_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role_Akses" ADD CONSTRAINT "Role_Akses_id_role_user_fkey" FOREIGN KEY ("id_role_user") REFERENCES "Role_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Underperson_Komite_Unit" ADD CONSTRAINT "Underperson_Komite_Unit_kode_jabatan_atasan_fkey" FOREIGN KEY ("kode_jabatan_atasan") REFERENCES "Referensi_Jabatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Underperson_Komite_Unit" ADD CONSTRAINT "Underperson_Komite_Unit_kode_jabatan_bawahan_fkey" FOREIGN KEY ("kode_jabatan_bawahan") REFERENCES "Referensi_Jabatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Underperson_Komite_Unit" ADD CONSTRAINT "Underperson_Komite_Unit_kode_bagian_atasan_fkey" FOREIGN KEY ("kode_bagian_atasan") REFERENCES "Referensi_Bagian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Underperson_Komite_Unit" ADD CONSTRAINT "Underperson_Komite_Unit_kode_bagian_bawahan_fkey" FOREIGN KEY ("kode_bagian_bawahan") REFERENCES "Referensi_Bagian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komite_Talent" ADD CONSTRAINT "Komite_Talent_id_komite_talent_fkey" FOREIGN KEY ("id_komite_talent") REFERENCES "Referensi_Komite_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komite_Talent" ADD CONSTRAINT "Komite_Talent_kode_jabatan_fkey" FOREIGN KEY ("kode_jabatan") REFERENCES "Referensi_Jabatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komite_Talent" ADD CONSTRAINT "Komite_Talent_kode_bagian_fkey" FOREIGN KEY ("kode_bagian") REFERENCES "Referensi_Bagian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameter_Komite_Talent" ADD CONSTRAINT "Parameter_Komite_Talent_id_komite_talent_fkey" FOREIGN KEY ("id_komite_talent") REFERENCES "Referensi_Komite_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameter_Talent_Qualification" ADD CONSTRAINT "Parameter_Talent_Qualification_id_komite_talent_fkey" FOREIGN KEY ("id_komite_talent") REFERENCES "Referensi_Komite_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameter_Talent_Cluster" ADD CONSTRAINT "Parameter_Talent_Cluster_id_komite_talent_fkey" FOREIGN KEY ("id_komite_talent") REFERENCES "Referensi_Komite_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameter_Talent_Cluster" ADD CONSTRAINT "Parameter_Talent_Cluster_id_kriteria_penilaian_fkey" FOREIGN KEY ("id_kriteria_penilaian") REFERENCES "Kriteria_Penilaian"("id_kriteria_penilaian") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Talent" ADD CONSTRAINT "Event_Talent_tipe_komite_talent_fkey" FOREIGN KEY ("tipe_komite_talent") REFERENCES "Referensi_Komite_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Talent" ADD CONSTRAINT "Event_Talent_nippos_ketua_komite_fkey" FOREIGN KEY ("nippos_ketua_komite") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Talent" ADD CONSTRAINT "Event_Talent_kode_rumpun_jabatan_fkey" FOREIGN KEY ("kode_rumpun_jabatan") REFERENCES "Referensi_Rumpun_Jabatan"("kode_rumpun_jabatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Talent" ADD CONSTRAINT "Event_Talent_evenstatus_id_fkey" FOREIGN KEY ("evenstatus_id") REFERENCES "Event_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komite_Talent_Event" ADD CONSTRAINT "Komite_Talent_Event_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komite_Talent_Event" ADD CONSTRAINT "Komite_Talent_Event_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Pertanyaan" ADD CONSTRAINT "Event_Pertanyaan_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Pertanyaan" ADD CONSTRAINT "Event_Pertanyaan_id_pertanyaan_fkey" FOREIGN KEY ("id_pertanyaan") REFERENCES "Referensi_Pertanyaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job_Level_Event" ADD CONSTRAINT "Job_Level_Event_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deadline_Event_Step" ADD CONSTRAINT "Deadline_Event_Step_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent_Qualification" ADD CONSTRAINT "Talent_Qualification_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent_Qualification" ADD CONSTRAINT "Talent_Qualification_eventtalenid_fkey" FOREIGN KEY ("eventtalenid") REFERENCES "Event_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent_Qualification" ADD CONSTRAINT "Talent_Qualification_id_kriteria_penilaian_fkey" FOREIGN KEY ("id_kriteria_penilaian") REFERENCES "Kriteria_Penilaian"("id_kriteria_penilaian") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kandidat_Talent_dan_Source" ADD CONSTRAINT "Kandidat_Talent_dan_Source_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kandidat_Talent_dan_Source" ADD CONSTRAINT "Kandidat_Talent_dan_Source_komite_unit_fkey" FOREIGN KEY ("komite_unit") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kandidat_Talent_dan_Source" ADD CONSTRAINT "Kandidat_Talent_dan_Source_eventtalentid_fkey" FOREIGN KEY ("eventtalentid") REFERENCES "Event_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent_Profile" ADD CONSTRAINT "Talent_Profile_nippos_fkey" FOREIGN KEY ("nippos") REFERENCES "Karyawan"("nippos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent_Profile" ADD CONSTRAINT "Talent_Profile_eventtalentid_fkey" FOREIGN KEY ("eventtalentid") REFERENCES "Event_Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
