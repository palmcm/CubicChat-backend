
export interface getUserDto {
    userId: string,
    username: string,
    profileImage: string
}

export interface getUsersDto {
    users: getUserDto[]
}