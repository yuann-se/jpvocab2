/*
  Warnings:

  - You are about to drop the column `transcription` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "transcription",
ADD COLUMN     "reading" TEXT[];
