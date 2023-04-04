import { MessageType } from '@prisma/client'

export interface getChatMessageDto {
  createdAt: Date
  messageType: MessageType
  sender: {
    username: string
    profileImage: string
  }
  content: string
}
