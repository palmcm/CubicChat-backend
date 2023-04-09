export interface GetStickerDto {
  stickerName: string
  stickerUrl: string
}

export interface GetStickersDto {
  stickers: GetStickerDto[]
}
