import { MessageType } from '@prisma/client'

export interface GetChatMessageDto {
  senderName: string
  senderId: string
  profileImage: string
  messageType: MessageType
  content: string
  timestamp: Date
}
