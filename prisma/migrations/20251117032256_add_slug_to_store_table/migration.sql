/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `store_tables` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `store_tables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "store_tables" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "store_tables_slug_key" ON "store_tables"("slug");
