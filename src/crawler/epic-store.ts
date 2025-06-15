import { GamePlatforms, HeaderTypes, HeaderValues } from "../enums";
import { Game } from "../interfaces";
import { getApiRequest } from "../requests";
import { EpicResponse } from "./interfaces";

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
      const url = offer.productSlug || offer.offerMappings[0].pageSlug || offer.catalogNs.mappings[0].pageSlug;
      const game: Game = {
        description: offer.description,
        endDateDiscount: offer.promotions?.promotionalOffers?.[0].promotionalOffers
          ? new Date(offer.promotions.promotionalOffers[0].promotionalOffers[0].endDate)
          : undefined,
        imageUrl: offer.keyImages[0].url,
        platform: GamePlatforms.Epic,
        productUrl: `https://store.epicgames.com/es-ES/p/${url}`,
        title: offer.title,
      };
      return game;
    });
  return games;
};
