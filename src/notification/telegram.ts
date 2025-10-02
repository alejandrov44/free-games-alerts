import { AxiosHeaders } from "axios";
import { HeaderTypes, HeaderValues } from "../enums";
import environmentVariables from "../environment";
import { Game } from "../interfaces";
import { postRequest } from "../requests";

const chatIds: string[] = [];

const botToken = Buffer.from(environmentVariables.telegramBotToken || "", "base64").toString("utf8");
const webhookUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

const escapeMarkdown = (text: string): string => {
  const charsToEscape = ["_", "*", "[", "]", "(", ")", "~", "`", ">", "#", "+", "-", "=", "|", "{", "}", ".", "!"];
  return text.replaceAll(new RegExp(`[\\${charsToEscape.join("\\")}]`, "g"), String.raw`\$&`);
};

export const sendTelegramBot = async (gamesList: Game[]): Promise<void> => {
  const title = String.raw`*🔥 New Games Available\! 🔥*`;
  const gamesText = gamesList.map((game, i) => formatGameForWebhook(game, i + 1)).join("\n");
  const message = `${title}\n\n${gamesText}`;
  const parseMode = "MarkdownV2";

  for (const chatId of chatIds) {
    const payload = { chat_id: chatId, parse_mode: parseMode, text: message };
    const headers = new AxiosHeaders({ [HeaderTypes.contentType]: HeaderValues.contentType });

    await postRequest(webhookUrl, JSON.stringify(payload), headers);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

const formatGameForWebhook = (game: Game, index: number): string => {
  const timestamp = game.endDateDiscount ? `${game.endDateDiscount.toLocaleString()}` : "sometime";
  return `${index}\\. *${escapeMarkdown(game.title)}*\nOn *${game.platform}* until ${timestamp}\n${
    escapeMarkdown(game.description) ? `${escapeMarkdown(game.description)}\n` : ""
  }\nLink To Game: ${escapeMarkdown(game.productUrl)}\n`;
};
