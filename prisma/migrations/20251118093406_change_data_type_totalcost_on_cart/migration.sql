/*
  Warnings:

  - You are about to alter the column `total_cost` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "total_cost" SET DATA TYPE INTEGER;
