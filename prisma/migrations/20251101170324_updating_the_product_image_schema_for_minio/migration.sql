/*
  Warnings:

  - You are about to drop the column `url` on the `ProductImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[objectName]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bucketName` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectName` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductImage` DROP COLUMN `url`,
    ADD COLUMN `bucketName` VARCHAR(191) NOT NULL,
    ADD COLUMN `isLeft` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `isMain` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `mimetype` VARCHAR(191) NULL,
    ADD COLUMN `objectName` VARCHAR(191) NOT NULL,
    ADD COLUMN `originalFilename` VARCHAR(191) NULL,
    ADD COLUMN `sizeBytes` BIGINT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ProductImage_objectName_key` ON `ProductImage`(`objectName`);
