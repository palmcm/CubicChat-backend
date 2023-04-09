import { MessageType } from '@prisma/client'

export interface GetChatMessageDto {
  createdAt: Date
  messageType: MessageType
  sender: {
    username: string
    profileImage: string
  }
  content: string
}
