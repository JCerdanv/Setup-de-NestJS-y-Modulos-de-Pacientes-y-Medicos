-- CreateEnum
CREATE TYPE "EstadoCita" AS ENUM ('PROGRAMADA', 'COMPLETADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RECEPCIONISTA', 'MEDICO', 'GERENCIA');

-- CreateTable
CREATE TABLE "especialidades" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "especialidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cmp" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "ecorreo" TEXT NOT NULL,
    "comentario" TEXT,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "citas" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,
    "status" "EstadoCita" NOT NULL,
    "diagnosis" TEXT NOT NULL,

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "especialidades_nombre_key" ON "especialidades"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_cmp_key" ON "medicos"("cmp");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_dni_key" ON "pacientes"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "medicos" ADD CONSTRAINT "medicos_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "especialidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "medicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
