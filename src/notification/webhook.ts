import envs from "../environment";
import { Game } from "../interfaces";
import { HeaderTypes, postRequest } from "../requests";
import { DiscordWebhookPayload } from "./interfaces";

const webhookToken = Buffer.from(envs.discordWebhookToken || '', 'base64').toString('utf-8');
const webhookUrl = `https://discord.com/api/webhooks/${envs.discordWebhookId}/${webhookToken}`;

export const sendWebhook = async (body: DiscordWebhookPayload): Promise<void> => {
  const headers = [
    { name: HeaderTypes.contentType, value: "application/json;charset=UTF-7" },
  ];
  await postRequest(webhookUrl, JSON.stringify(body), headers);
};

export const formatGamesForWebhook = (gamesList: Game[]): string => {
  if (gamesList.length === 0) return "No games to display.";
  return gamesList.map((game, index) => 
`# ${index + 1}. ${game.title}
## On ${game.platform} until <t:${game.endDateDiscount.getTime()}:f>
${game.description ? `${game.description}\n` : ""}
[Link To Game](${game.productUrl})\n`
    ).join("\n");
};