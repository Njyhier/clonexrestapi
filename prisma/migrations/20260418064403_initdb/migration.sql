-- CreateTable
CREATE TABLE "clonex_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "clonex_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "clonex_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "clonex_users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "clonex_comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "clonex_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "clonex_users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "clonex_comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "clonex_posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "clonex_likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT,
    "commentId" TEXT,
    "userId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "clonex_likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "clonex_comments" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "clonex_likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "clonex_posts" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "clonex_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "clonex_users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "clonex_followers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "clonex_followers_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "clonex_users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "clonex_followers_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "clonex_users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "clonex_users_username_key" ON "clonex_users"("username");
