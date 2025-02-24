import { GamePlatforms, HeaderTypes, HeaderValues } from "../enums";
import { Game } from "../interfaces";
import { EpicResponse } from "./interfaces";
import { getApiRequest } from "../requests";

const freeGamesApiUrl = "https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions";

export const fetchFreeEpicGames = async (): Promise<Game[]> => {
  const headers = [{ name: HeaderTypes.contentType, value: HeaderValues.contentType }];
  const response = (await getApiRequest(freeGamesApiUrl, headers)) as EpicResponse;
  const offers = response.data.Catalog.searchStore.elements;
  const games = offers
    .filter(
      (offer) =>
        offer.promotions?.promotionalOffers?.[0]?.promotionalOffers &&
        offer.promotions.promotionalOffers[0].promotionalOffers[0].discountSetting.discountPercentage === 0,
    )
    .map((offer) => {
      const game: Game = {
        platform: GamePlatforms.Epic,
        title: offer.title,
        description: offer.description,
        imageUrl: offer.keyImages[0].url,
        productUrl: `https://store.epicgames.com/es-ES/p/${offer.catalogNs.mappings[0].pageSlug}`,
        endDateDiscount: offer.promotions?.promotionalOffers?.[0].promotionalOffers
          ? new Date(offer.promotions.promotionalOffers[0].promotionalOffers[0].endDate)
          : undefined,
      };
      return game;
    });
  return games;
};
