import { GamePlatforms, HeaderTypes, HeaderValues, Months } from "../enums";
import { Game } from "../interfaces";
import { getHTMLRequest } from "../requests";

const freeGamesApiUrl =
  "https://store.steampowered.com/search/results/?maxprice=free&specials=1&ignore_preferences=1";

const headers = [
  {
    name: HeaderTypes.contentType,
    value: HeaderValues.contentType,
  },
  {
    name: HeaderTypes.cookie,
    value: HeaderValues.steamCookie,
  },
];

export const fetchSteamGames = async (): Promise<Game[]> => {
  const $ = await getHTMLRequest(freeGamesApiUrl, headers);
  const $games = $("#search_resultsRows").children("a");
  const games = $games
    .map(async (_, element) => {
      const item = $(element);
      return await fetchSteamGameInfo(item.attr("href") ?? "");
    })
    .get();
  return Promise.all(games);
};

export const fetchSteamGameInfo = async (gameUrl: string): Promise<Game> => {
  const $ = await getHTMLRequest(gameUrl, headers);
  const game: Game = {
    platform: GamePlatforms.Steam,
    title: $("div#appHubAppName").text(),
    description: $('meta[property="og:description"]').attr("content") ?? "",
    imageUrl: $("img.game_header_image_full").attr("src") ?? "",
    productUrl: gameUrl,
    endDateDiscount: getSteamEndOfferDay(
      $('p[class="game_purchase_discount_quantity "]').text()
    ),
  };
  return game;
};

export const getSteamEndOfferDay = (rawDateText: string): Date | undefined => {
  const regex = /^.*(\w{3}).*?(\d+).*?(\d+).*?$/m;
  const dateObject = regex.exec(rawDateText) ?? [];
  if (!dateObject[1]) return undefined;
  const month = Months[dateObject[1]] as Months;
  const date = `2025-${month}-${dateObject[2]}T${dateObject[3]}:00:00.000Z`;
  return new Date(date);
};
