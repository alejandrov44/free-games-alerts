import { GamePlatforms, HeaderTypes } from "./enums";

export interface Header {
  name: HeaderTypes,
  value: string,
}

export interface Game {
  platform: GamePlatforms,
  title: string,
  description: string,
  imageUrl: string,
  productUrl: string,
  endDateDiscount?: Date,
};