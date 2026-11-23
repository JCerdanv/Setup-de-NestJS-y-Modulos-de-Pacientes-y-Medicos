/*
  Warnings:

  - Added the required column `ecorreo` to the `medicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `medicos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicos" ADD COLUMN     "ecorreo" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;
