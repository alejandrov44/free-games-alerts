import { GamePlatforms, HeaderTypes, HeaderValues } from "../enums";
import { Game } from "../interfaces";
import { GogResponse } from "./interfaces";
import { getApiRequest } from "../requests";

const freeGamesApiUrl =
  "https://catalog.gog.com/v1/catalog?limit=140&price=between:0,0&order=desc:trending&discounted=eq:true&productType=in:game,pack,dlc,extras&page=1&countryCode=ES&locale=en-US&currencyCode=EUR";

export const fetchFreeGogGames = async (): Promise<Game[]> => {
  const headers = [{ name: HeaderTypes.contentType, value: HeaderValues.contentType }];
  const response = (await getApiRequest(freeGamesApiUrl, headers)) as GogResponse;
  const offers = response.products;
  const games = offers.map((offer) => {
    const game: Game = {
      platform: GamePlatforms.Gog,
      title: offer.title,
      description: "",
      imageUrl: offer.coverHorizontal,
      productUrl: offer.storeLink,
      endDateDiscount: new Date(),
    };
    return game;
  });
  return games;
};
