-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT,
    "commentId" TEXT,
    "userId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_likes" ("created_at", "id", "postId", "userId") SELECT "created_at", "id", "postId", "userId" FROM "likes";
DROP TABLE "likes";
ALTER TABLE "new_likes" RENAME TO "likes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
