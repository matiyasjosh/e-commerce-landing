/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - Added the required column `brandDesc1` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandDesc2` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandDesc3` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `description`,
    ADD COLUMN `brandDesc1` VARCHAR(191) NOT NULL,
    ADD COLUMN `brandDesc2` VARCHAR(191) NOT NULL,
    ADD COLUMN `brandDesc3` VARCHAR(191) NOT NULL,
    ADD COLUMN `shortDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `tag` VARCHAR(191) NOT NULL;
