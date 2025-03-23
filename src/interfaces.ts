import { GamePlatforms, HeaderTypes, HeaderValues } from "./enums";

export interface Header {
  name: HeaderTypes;
  value: HeaderValues;
}

export interface Game {
  description: string;
  endDateDiscount?: Date;
  imageUrl: string;
  platform: GamePlatforms;
  productUrl: string;
  title: string;
}
