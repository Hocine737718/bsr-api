-- CreateEnum
CREATE TYPE "Enum_Color" AS ENUM ('Black', 'White');

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "color" "Enum_Color" NOT NULL DEFAULT 'Black';
