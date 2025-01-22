import { GamePlatforms } from "../enums";
import { Game } from "../interfaces";
import { getHTMLRequest, HeaderTypes } from "../requests";

const freeGamesApiUrl = "https://store.steampowered.com/search/results/?maxprice=free&specials=1&ignore_preferences=1";

const headers = [
  { 
    name: HeaderTypes.contentType, 
    value: "application/json;charset=UTF-7",
  },
  { 
    name: HeaderTypes.cookie, 
    value: "lastagecheckage=1-January-1999; birthtime=915170401; wants_mature_content=1",
  },
];

export const fetchSteamGames = async (): Promise<Game[]> => {
  const $ = await getHTMLRequest(freeGamesApiUrl, headers);
  const $games = $("#search_resultsRows").children('a');
  const games = $games.map(async (_, element) => {
    const item = $(element);
    return await fetchSteamGameInfo(item.attr("href"));
  }).get();
  return Promise.all(games);
};

// Add a cookie
export const fetchSteamGameInfo = async (gameUrl: string): Promise<Game> => {
  const $ = await getHTMLRequest(freeGamesApiUrl, headers);
  const $games = $("#search_resultsRows").children('a');
  const game: Game = {
    platform: GamePlatforms.Steam,
    title: item.attr("href")!,
    description: item.attr("href")!,
    imageUrl: item.attr("href")!,
    productUrl: `https://store.epicgames.com/es-ES/p/${item.attr("href")!}`,
    endDateDiscount: undefined,
  };
  return game;
};


(async () => {
  console.log(await fetchSteamGames());
})()