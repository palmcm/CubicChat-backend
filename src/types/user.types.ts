export interface GetUserDto {
  userId: string
  username: string
  profileImage: string
}

export interface GetUsersDto {
  users: GetUserDto[]
}
