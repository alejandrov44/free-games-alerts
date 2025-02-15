import { GamePlatforms, HeaderTypes } from "../enums";
import { EpicResponse, Game } from "../interfaces";
import { getApiRequest } from "../requests";

const freeGamesApiUrl = "https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions";

export const fetchFreeEpicGames = async (): Promise<Game[]> => {
  const headers = [
    { name: HeaderTypes.contentType, value: "application/json;charset=UTF-7" },
  ];
  const response = await getApiRequest(freeGamesApiUrl, headers) as EpicResponse;
  const offers = response.data.Catalog.searchStore.elements;
  const games = offers.reduce((acc, offer) => {
    if (offer.promotions?.promotionalOffers) {
      const firstOffer = offer.promotions.promotionalOffers[0];
      if (firstOffer?.promotionalOffers) {
        if(firstOffer.promotionalOffers[0].discountSetting.discountPercentage === 0) {
          const date = offer.promotions?.promotionalOffers?.[0].promotionalOffers !== undefined ? 
            offer.promotions.promotionalOffers[0].promotionalOffers[0].endDate : "";
          const game: Game = {
            platform: GamePlatforms.Epic,
            title: offer.title,
            description: offer.description,
            imageUrl: offer.keyImages[0].url,
            productUrl: `https://store.epicgames.com/es-ES/p/${offer.catalogNs.mappings[0].pageSlug}`,
            endDateDiscount: new Date(date),
          };
          acc.push(game as never);
        }
      }
    }
    return acc;
  }, []);
  return games;
};