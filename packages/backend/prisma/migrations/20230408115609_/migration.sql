/*
  Warnings:

  - You are about to drop the column `collectionItemId` on the `TradeOffer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TradeOffer" DROP CONSTRAINT "TradeOffer_collectionItemId_fkey";

-- AlterTable
ALTER TABLE "TradeOffer" DROP COLUMN "collectionItemId";

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_tradeOfferId_fkey" FOREIGN KEY ("tradeOfferId") REFERENCES "TradeOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
