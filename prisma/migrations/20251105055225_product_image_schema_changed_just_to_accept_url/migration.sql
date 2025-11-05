/*
  Warnings:

  - You are about to drop the column `bucketName` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `objectName` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `originalFilename` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `sizeBytes` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `url` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `ProductImage_objectName_key` ON `ProductImage`;

-- AlterTable
ALTER TABLE `ProductImage` DROP COLUMN `bucketName`,
    DROP COLUMN `mimetype`,
    DROP COLUMN `objectName`,
    DROP COLUMN `originalFilename`,
    DROP COLUMN `sizeBytes`,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
