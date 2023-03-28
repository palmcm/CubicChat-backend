-- CreateEnum
CREATE TYPE "ChatRoomType" AS ENUM ('PRIVATE', 'GROUP');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'STICKER');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ChatRoom" (
    "chatRoomId" TEXT NOT NULL,
    "chatRoomType" "ChatRoomType" NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("chatRoomId")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chatRoomId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "Sticker" (
    "stickerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stickerUrl" TEXT NOT NULL,
    "stickerName" TEXT NOT NULL,

    CONSTRAINT "Sticker_pkey" PRIMARY KEY ("stickerId")
);

-- CreateTable
CREATE TABLE "_ChatRoomToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatRoomToUser_AB_unique" ON "_ChatRoomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatRoomToUser_B_index" ON "_ChatRoomToUser"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("chatRoomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomToUser" ADD CONSTRAINT "_ChatRoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ChatRoom"("chatRoomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomToUser" ADD CONSTRAINT "_ChatRoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
