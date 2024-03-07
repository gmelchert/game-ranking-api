/*
  Warnings:

  - Added the required column `map` to the `counter_strike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `won` to the `counter_strike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "counter_strike" ADD COLUMN     "map" TEXT NOT NULL,
ADD COLUMN     "won" BOOLEAN NOT NULL;
