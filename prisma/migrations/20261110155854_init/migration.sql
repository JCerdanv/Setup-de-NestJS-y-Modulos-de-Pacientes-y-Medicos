/*
  Warnings:

  - Added the required column `descripcion` to the `especialidades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "especialidades" ADD COLUMN     "descripcion" TEXT NOT NULL;
