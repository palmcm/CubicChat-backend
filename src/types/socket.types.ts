import { MessageType } from '@prisma/client'

export interface ServerToClientEvents {
  chatMessage: (data: {
    sender: string
    profileImage: string
    roomId: string
    type: MessageType
    message: string
    timestamp: Date
  }) => void
  notify: (roomId: string) => void
  invite: (roomId: string) => void
}

export interface ClientToServerEvents {
  chatMessage: (roomId: string, type: MessageType, message: string) => void
  join: (roomId: string) => void
  leave: (roomId: string) => void
  addRoom: (roomId: string, userId: string) => void
}
