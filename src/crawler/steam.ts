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

export const fetchSteamGameInfo = async (gameUrl: string): Promise<Game> => {
  const $ = await getHTMLRequest(gameUrl, headers);
  const game: Game = {
    platform: GamePlatforms.Steam,
    title: $("div#appHubAppName").text()!,
    description: $("meta[property=\"og:description\"]").attr("content")!,
    imageUrl: $("img.game_header_image_full").attr("src")!,
    productUrl: gameUrl,
    endDateDiscount: getSteamEndOfferDay($("p.game_purchase_discount_quantity ").text()!),
  };
  return game;
};

export const getSteamEndOfferDay = (rawDateText: string): Date => {
  const regex = /^.*?(\d+).*?(\w{3}).*?(\d+).*?$/m;
  const dateObject = regex.exec(rawDateText);
  const date = `2025-${Months[dateObject[2]]}-${dateObject[1]}T${dateObject[3]}:00:00.000Z`
  return new Date(date);
};

export enum Months {
  Jan = "01",
  Feb = "02",
  Mar = "03",
  Apr = "04",
  May = "05",
  Jun = "06",
  Jul = "07",
  Aug = "08",
  Sep = "09",
  Oct = "10",
  Nov = "11",
  Dec = "12",
}

(async () => {
  console.log(await fetchSteamGames());
})()