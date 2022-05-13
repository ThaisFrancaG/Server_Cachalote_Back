-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "signUpDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPreferences" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "avatar" TEXT,
    "likesBooks" BOOLEAN NOT NULL DEFAULT true,
    "likesNovels" BOOLEAN NOT NULL DEFAULT true,
    "likesManga" BOOLEAN NOT NULL DEFAULT true,
    "likesComics" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "userPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userNotifications" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "showPublic" BOOLEAN NOT NULL DEFAULT true,
    "showFriends" BOOLEAN NOT NULL DEFAULT true,
    "getPublic" BOOLEAN NOT NULL DEFAULT true,
    "getFriends" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "userNotifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relations" (
    "id" SERIAL NOT NULL,
    "whoAskedID" INTEGER NOT NULL,
    "wasAskedID" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "relations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "userPreferences" ADD CONSTRAINT "userPreferences_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userNotifications" ADD CONSTRAINT "userNotifications_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_whoAskedID_fkey" FOREIGN KEY ("whoAskedID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_wasAskedID_fkey" FOREIGN KEY ("wasAskedID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
