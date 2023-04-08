
export interface getUserDto {
    userId: number,
    username: string,
    profileImage: string
}

export interface getUsersDto {
    users: getUserDto[]
}