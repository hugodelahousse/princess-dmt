/*
  Warnings:

  - You are about to drop the `Interns` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Interns";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Intern" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InternLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "internId" INTEGER NOT NULL,
    "morningDive" BOOLEAN NOT NULL,
    "morningDiveType" TEXT NOT NULL,
    "morningDiveGuided" BOOLEAN NOT NULL,
    "afternoonDive" BOOLEAN NOT NULL,
    "afternoonDiveGuided" BOOLEAN NOT NULL,
    "afternoonDiveType" TEXT NOT NULL,
    "shopShift" BOOLEAN NOT NULL,
    "lunchPacking" BOOLEAN NOT NULL,
    "eveningPacking" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InternLog_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
