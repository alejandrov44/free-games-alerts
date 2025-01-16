import { Game } from "../interfaces";
import { HeaderTypes, postRequest } from "../requests";
import { DiscordWebhookPayload } from "./interfaces";

const url = "https://discord.com/api/webhooks/1329416653695488010/aL2uEoXIwrkbGE47q9ihxHRPEnua3zBoII-t6k104rMJ0kpLv2HHFCUpTZlqaRF5HiKI"

export const sendWebhook = async (body: DiscordWebhookPayload): Promise<void> => {
  const headers = [
    { name: HeaderTypes.contentType, value: "application/json;charset=UTF-7" },
  ];
  await postRequest(url, JSON.stringify(body), headers);
};

export const formatGamesForWebhook = (gamesList: Game[]): string => {
  if (gamesList.length === 0) return "No games to display.";
  return gamesList
    .map((game, index) => `**${index + 1}. ${game.title}**\n${game.description}\n[View Product](${game.productUrl})\n`)
    .join("\n");
};