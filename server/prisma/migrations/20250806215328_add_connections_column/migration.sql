-- CreateTable
CREATE TABLE "public"."ConnectionRequest" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConnectionRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ConnectionRequest" ADD CONSTRAINT "ConnectionRequest_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ConnectionRequest" ADD CONSTRAINT "ConnectionRequest_toId_fkey" FOREIGN KEY ("toId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
