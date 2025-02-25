/*
  Warnings:

  - Added the required column `nome` to the `pessoas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pessoas" ADD COLUMN     "nome" TEXT NOT NULL;
