import { HeaderTypes, HeaderValues } from "../enums";
import environmentVariables from "../environment";
import { Game } from "../interfaces";
import { postRequest } from "../requests";
import { removeIlegalDiscordChars } from "../utilities";
import { DiscordWebhookPayload } from "./interfaces";

const webhookToken = Buffer.from(environmentVariables.discordWebhookToken || "", "base64").toString("utf8");
const webhookUrl = `https://discord.com/api/webhooks/${environmentVariables.discordWebhookId}/${webhookToken}`;

export const sendDiscordWebhook = async (gamesList: Game[]): Promise<void> => {
  const avatarUrl = "https://i.pinimg.com/originals/59/47/e3/5947e39172b6cc8d5c362a494ad5bc4f.jpg";
  const username = "Free Games Bot (by alejandrov44)";
  const body: DiscordWebhookPayload = { username, avatar_url: avatarUrl };
  for (let index = 0; index < gamesList.length; index += 1) {
    const actualIndex = Number(index);
    body.content = formatGameForWebhook(gamesList[actualIndex], actualIndex + 1);
    const headers = [{ name: HeaderTypes.contentType, value: HeaderValues.contentType }];
    await postRequest(webhookUrl, JSON.stringify(body), headers);
  }
};

const formatGameForWebhook = (game: Game, index: number): string => {
  const timestamp = game.endDateDiscount ? `<t:${game.endDateDiscount.getTime() / 1000}:f>` : "sometime";
  return `# ${index}. ${removeIlegalDiscordChars(game.title)}\n ## On ${game.platform} until ${timestamp}\n ${
    game.description ? `${removeIlegalDiscordChars(game.description)}\n` : ""
  }\n [Link To Game](${game.productUrl})\n`;
};
