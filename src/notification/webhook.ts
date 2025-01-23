import envs from "../environment";
import { Game } from "../interfaces";
import { HeaderTypes, postRequest } from "../requests";
import { DiscordWebhookPayload } from "./interfaces";

const webhookToken = Buffer.from(envs.discordWebhookToken || "", "base64").toString("utf-8");
const webhookUrl = `https://discord.com/api/webhooks/${envs.discordWebhookId}/${webhookToken}`;

export const sendDiscordWebhook = async (gamesList: Game[]): Promise<void> => {
  const body: DiscordWebhookPayload = {
    username: "Free Games Bot (by alejandrov44)",
    avatar_url: "https://i.pinimg.com/originals/59/47/e3/5947e39172b6cc8d5c362a494ad5bc4f.jpg"
  };
  for (let i = 0; i < gamesList.length; i += 1) {
    const actualIndex = Number(i);
    body.content = formatGameForWebhook(gamesList[actualIndex], actualIndex+1);
    const headers = [
      { name: HeaderTypes.contentType, value: "application/json;charset=UTF-7" },
    ];
    await postRequest(webhookUrl, JSON.stringify(body), headers);
  }
};

export const formatGameForWebhook = (game: Game, index: number): string => {
  const timestamp = game.endDateDiscount.getTime() / 1000;
  return `# ${index}. ${game.title}\n ## On ${game.platform} until <t:${timestamp}:f>\n ${game.description ? `${game.description}\n` : ""}\n [Link To Game](${game.productUrl})\n`;
};