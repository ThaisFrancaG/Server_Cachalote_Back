-- AlterTable
ALTER TABLE "userNotifications" ALTER COLUMN "showPublic" SET DEFAULT false,
ALTER COLUMN "showFriends" SET DEFAULT false,
ALTER COLUMN "getPublic" SET DEFAULT false,
ALTER COLUMN "getFriends" SET DEFAULT false;

-- AlterTable
ALTER TABLE "userPreferences" ALTER COLUMN "likesNovels" SET DEFAULT false,
ALTER COLUMN "likesComics" SET DEFAULT false;
