import { MessageType } from '@prisma/client'

export interface GetChatMessageDto {
  messageId: string
  senderName: string
  senderId: string
  profileImage: string
  messageType: MessageType
  content: string
  timestamp: Date
}
