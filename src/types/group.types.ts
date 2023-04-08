

export interface getGroupDto {
    chatRoomId: number,
    name: string,
    chatRoomType: string,
}

export interface getGroupsDto {
    groups: getGroupDto[]
}