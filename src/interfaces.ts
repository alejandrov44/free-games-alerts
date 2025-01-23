import { GamePlatforms } from "./enums";

export interface Game {
  platform: GamePlatforms,
  title: string,
  description: string,
  imageUrl: string,
  productUrl: string,
  endDateDiscount: Date,
};

export interface EpicResponse {
  data: {
    Catalog: {
      searchStore: {
        elements: EpicApiGameInfo[],
      },
    },
  },
};

export interface EpicApiGameInfo {
  title: string,
  description: string,
  promotions?: {
    promotionalOffers?: [{
      promotionalOffers?: [{
        discountSetting: {
          discountPercentage: number;
        }; endDate: string;
      }] | undefined,
    }] | undefined,
  },
  keyImages: [
    {
      url: string,
    },
  ],
  catalogNs: {
    mappings: [
      {
        pageSlug: string,
      },
    ],
  },
};

export interface GogResponse {
  products: GogApiGameInfo[],
};

export interface GogApiGameInfo {
  title: string,
  coverHorizontal: string,
  storeLink: string,
};