import { MessageType } from '@prisma/client'

export interface ServerToClientEvents {
  chatMessage: (data: {
    messageId: string
    senderId: string
    senderName: string
    profileImage: string
    messageType: MessageType
    content: string
    timestamp: Date
  }) => void
  notify: (roomId: string) => void
  invite: (roomId: string) => void
}

export interface ClientToServerEvents {
  chatMessage: (
    roomId: string,
    type: MessageType,
    message: string,
  ) => Promise<void>
  join: (roomId: string) => void
  leave: (roomId: string) => void
  addRoom: (roomId: string, userId?: string) => Promise<void>
}
