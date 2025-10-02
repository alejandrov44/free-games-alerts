import { GamePlatforms, HeaderTypes, HeaderValues, monthMap } from "../enums";
import { Game } from "../interfaces";
import { getHTMLRequest } from "../requests";

const freeGamesApiUrl = "https://store.steampowered.com/search/results/?maxprice=free&specials=1&ignore_preferences=1";

const headers = [
  { name: HeaderTypes.contentType, value: HeaderValues.contentType },
  { name: HeaderTypes.acceptLanguage, value: HeaderValues.acceptLanguage },
  { name: HeaderTypes.cookie, value: HeaderValues.steamCookie },
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
    description: $('meta[property="og:description"]').attr("content") ?? "",
    endDateDiscount: getSteamEndOfferDay($('p[class="game_purchase_discount_quantity "]').text()),
    imageUrl: $("img.game_header_image_full").attr("src") ?? "",
    platform: GamePlatforms.Steam,
    productUrl: gameUrl,
    title: $("div#appHubAppName").text(),
  };
  return game;
};

export const getSteamEndOfferDay = (rawDateText: string): Date | undefined => {
  const regexDay = /\s(\d{1,2})\s/i;
  const regexMonth = /\s(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i;
  const regexHours = /(\d{1,2}):(\d{1,2})\s?(am|pm)/i;

  const matchDay = regexDay.exec(rawDateText);
  const matchMonth = regexMonth.exec(rawDateText);
  const matchHours = regexHours.exec(rawDateText);

  if (!matchDay || !matchMonth || !matchHours) {
    return undefined;
  }

  const day = Number.parseInt(matchDay[1], 10);
  const monthName = matchMonth[1];
  const hour12 = Number.parseInt(matchHours[1], 10);
  const minutes = Number.parseInt(matchHours[2], 10);
  const period = matchHours[3].toLowerCase();

  const month = monthMap[monthName];

  const year = new Date().getFullYear();

  let hours = hour12;
  if (period === "pm" && hour12 !== 12) {
    hours += 12;
  } else if (period === "am" && hour12 === 12) {
    hours = 0;
  }

  return new Date(year, month, day, hours, minutes);
};
