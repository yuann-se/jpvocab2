/*
  Warnings:

  - You are about to drop the column `importance` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `word` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "importance",
DROP COLUMN "word",
ADD COLUMN     "writing" TEXT[];
