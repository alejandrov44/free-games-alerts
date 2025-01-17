import { GamePlatforms } from "./enums";

export interface Game {
  platform: GamePlatforms,
  title: string,
  description: string,
  imageUrl: string,
  productUrl: string,
  endDateDiscount: Date,
}