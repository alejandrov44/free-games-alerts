export interface JsonGame {
  gameId: string;
  platform: string;
  title: string;
  description: string;
  imageUrl: string;
  productUrl: string;
  endDateDiscount?: string;
}

export interface HistoricalGamesJson {
  games: JsonGame[];
}
