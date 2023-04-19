/*
  Warnings:

  - Added the required column `collectionItemId` to the `TradeOffer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CollectionItem" DROP CONSTRAINT "CollectionItem_tradeOfferId_fkey";

-- AlterTable
ALTER TABLE "TradeOffer" ADD COLUMN     "collectionItemId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TradeOffer" ADD CONSTRAINT "TradeOffer_collectionItemId_fkey" FOREIGN KEY ("collectionItemId") REFERENCES "CollectionItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
