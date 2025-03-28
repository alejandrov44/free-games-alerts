export interface EpicApiGameInfo {
  catalogNs: { mappings: [{ pageSlug: string }] };
  description: string;
  keyImages: [{ url: string }];
  productSlug: string;
  promotions?: {
    promotionalOffers?: [
      { promotionalOffers?: [{ discountSetting: { discountPercentage: number }; endDate: string }] },
    ];
  };
  title: string;
}

export interface EpicResponse {
  data: { Catalog: { searchStore: { elements: EpicApiGameInfo[] } } };
}

export interface GogApiGameInfo {
  coverHorizontal: string;
  storeLink: string;
  title: string;
}

export interface GogResponse {
  products: GogApiGameInfo[];
}
