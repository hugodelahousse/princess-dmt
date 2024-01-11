/*
  Warnings:

  - You are about to drop the column `shopShift` on the `InternLog` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InternLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "internId" INTEGER NOT NULL,
    "morningDive" BOOLEAN NOT NULL,
    "morningDiveType" TEXT,
    "morningDiveGuided" BOOLEAN,
    "afternoonDive" BOOLEAN NOT NULL,
    "afternoonDiveGuided" BOOLEAN,
    "afternoonDiveType" TEXT,
    "lunchPacking" BOOLEAN NOT NULL,
    "eveningPacking" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InternLog_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InternLog" ("afternoonDive", "afternoonDiveGuided", "afternoonDiveType", "createdAt", "date", "eveningPacking", "id", "internId", "lunchPacking", "morningDive", "morningDiveGuided", "morningDiveType", "updatedAt") SELECT "afternoonDive", "afternoonDiveGuided", "afternoonDiveType", "createdAt", "date", "eveningPacking", "id", "internId", "lunchPacking", "morningDive", "morningDiveGuided", "morningDiveType", "updatedAt" FROM "InternLog";
DROP TABLE "InternLog";
ALTER TABLE "new_InternLog" RENAME TO "InternLog";
CREATE INDEX "InternLog_internId_idx" ON "InternLog"("internId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
