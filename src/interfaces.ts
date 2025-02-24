import { GamePlatforms, HeaderTypes, HeaderValues } from "./enums"

export interface Header {
  name: HeaderTypes
  value: HeaderValues
}

export interface Game {
  platform: GamePlatforms
  title: string
  description: string
  imageUrl: string
  productUrl: string
  endDateDiscount?: Date
}
