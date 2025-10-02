import path from "node:path";
import dotenv from "dotenv-safe";
import { validatDiscordWebhookId, validateDiscordWebhookToken, validateTelegramBotToken } from "./utilities";

dotenv.config({ example: path.resolve(import.meta.dirname, "../.env.example") });

interface EnvironmentVariables {
  discordWebhookId: string;
  discordWebhookToken: string;
  telegramBotToken: string;
}

enum EnvironmentVariablesMap {
  discordWebhookId = "DISCORD_WEBHOOK_ID",
  discordWebhookToken = "DISCORD_WEBHOOK_TOKEN",
  telegramBotToken = "TELEGRAM_BOT_TOKEN",
}

const environmentVariables: EnvironmentVariables = {
  discordWebhookId: process.env[EnvironmentVariablesMap.discordWebhookId]
    ? validatDiscordWebhookId(process.env[EnvironmentVariablesMap.discordWebhookId])
    : "",
  discordWebhookToken: process.env[EnvironmentVariablesMap.discordWebhookToken]
    ? validateDiscordWebhookToken(process.env[EnvironmentVariablesMap.discordWebhookToken])
    : "",
  telegramBotToken: process.env[EnvironmentVariablesMap.telegramBotToken]
    ? validateTelegramBotToken(process.env[EnvironmentVariablesMap.telegramBotToken])
    : "",
};

export default environmentVariables;
