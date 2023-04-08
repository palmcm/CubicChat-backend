

export interface getGroupDto {
    chatRoomId: string,
    name: string | null,
}

export interface getGroupsDto {
    groups: getGroupDto[]
}

export interface chatRoomIdDto {
    chatRoomId: string,
}

export interface joinGroupDto {
    roomId: string,
}