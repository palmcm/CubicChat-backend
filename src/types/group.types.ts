import { ChatRoomType } from '@prisma/client'

export interface GetGroupDto {
  chatRoomId: string
  name: string | null
}

export interface GetGroupsDto {
  groups: GetGroupDto[]
}

export interface ChatRoomIdDto {
  chatRoomId: string
}

export interface JoinGroupDto {
  roomId: string
}

export interface getRecentGroupDto {
  name: string
  imageUrl?: string
  chatRoomId: string
  chatRoomType: ChatRoomType
}

export interface GetRecentGroupsDto {
  groups: getRecentGroupDto[]
}

export interface GetGroupInfoDto {
  id: string
  name: string
  imageUrl?: string
}