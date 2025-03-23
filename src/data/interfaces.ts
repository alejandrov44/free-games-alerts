export interface JsonGame {
  description: string;
  endDateDiscount?: string;
  gameId: string;
  imageUrl: string;
  platform: string;
  productUrl: string;
  title: string;
}

export interface HistoricalGamesJson {
  games: JsonGame[];
}
