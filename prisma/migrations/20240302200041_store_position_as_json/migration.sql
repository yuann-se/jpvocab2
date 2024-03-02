/*
  Warnings:

  - You are about to drop the column `mode` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_preferenceId_fkey";

-- AlterTable
ALTER TABLE "Preference" DROP COLUMN "mode",
ADD COLUMN     "createButtonPosition" JSONB;

-- DropTable
DROP TABLE "Position";
