import { GamePlatforms } from "../enums";
import { Game } from "../interfaces";
import { getHTMLRequest, HeaderTypes } from "../requests";

const freeGamesApiUrl = "https://store.steampowered.com/search/results/?maxprice=free&specials=1&ignore_preferences=1";

export const fetchSteamGames = async (): Promise<Game[]> => {
  const headers = [
    { name: HeaderTypes.contentType, value: "application/json;charset=UTF-7" },
  ];
  const $ = await getHTMLRequest(freeGamesApiUrl, headers);
  const $games = $("#search_result_container").children('li');
  const games = $games.map((index, element) => {
    const item = $(element);
    const game: Game = {
      platform: GamePlatforms.Steam,
      title: item.attr("href")!,
      description: item.attr("href")!,
      imageUrl: item.attr("href")!,
      productUrl: `https://store.epicgames.com/es-ES/p/${item.attr("href")!}`,
      endDateDiscount: undefined,
    };
    return game;
  }).get();
  return games;
};


(async () => {
  console.log(await fetchSteamGames());
})()