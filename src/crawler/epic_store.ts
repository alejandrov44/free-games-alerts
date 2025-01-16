import { Game } from "../interfaces";
import { getApiRequest, HeaderTypes } from "../requests";

const freeGamesApiUrl = "https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions";

export const fetchFreeEpicGames = async (): Promise<Game[]> => {
  const headers = [
    { name: HeaderTypes.contentType, value: "application/json;charset=UTF-7" },
  ];
  const response = await getApiRequest(freeGamesApiUrl, headers);
  const offers = response.data.Catalog.searchStore.elements;
  const games = offers
  .filter((offer) => offer.promotions?.promotionalOffers[0]?.promotionalOffers[0].discountSetting.discountPercentage === 0)
  .map((offer) => {
    const game: Game = {
      title: offer.title,
      description: offer.description,
      imageUrl: offer.keyImages[0].url,
      productUrl: `https://store.epicgames.com/es-ES/p/${offer.urlSlug}`,
    };
    return game;
  });
  return games;
};


(async () => {
  console.log(await fetchFreeEpicGames());
})()