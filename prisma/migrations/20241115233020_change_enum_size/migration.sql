/*
  Warnings:

  - The `size` column on the `OrderItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Enum_Size" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "size",
ADD COLUMN     "size" "Enum_Size" NOT NULL DEFAULT 'S';

-- DropEnum
DROP TYPE "Size";
