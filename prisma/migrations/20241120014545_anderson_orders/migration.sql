-- CreateEnum
CREATE TYPE "Enum_AndersonOrder" AS ENUM ('InProgress', 'Success', 'Error');

-- CreateTable
CREATE TABLE "AndersonOrders" (
    "id" UUID NOT NULL,
    "orderId" UUID,
    "status" "Enum_AndersonOrder" NOT NULL DEFAULT 'InProgress',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "AndersonOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AndersonOrders_orderId_key" ON "AndersonOrders"("orderId");

-- AddForeignKey
ALTER TABLE "AndersonOrders" ADD CONSTRAINT "AndersonOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
