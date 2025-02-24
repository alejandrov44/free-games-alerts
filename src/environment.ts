import dotenv from "dotenv-safe";
import { validatDiscordWebhookId, validateDiscordWebhookToken } from "./utilities";
import path from "node:path";

dotenv.config({ example: path.resolve(import.meta.dirname, "../.env.example") });

interface EnvironmentVariables {
  discordWebhookToken: string;
  discordWebhookId: string;
}

enum EnvironmentVariablesMap {
  discordWebhookToken = "DISCORD_WEBHOOK_TOKEN",
  discordWebhookId = "DISCORD_WEBHOOK_ID",
}

const environmentVariables: EnvironmentVariables = {
  discordWebhookId: validatDiscordWebhookId(process.env[EnvironmentVariablesMap.discordWebhookId] ?? ""),
  discordWebhookToken: validateDiscordWebhookToken(process.env[EnvironmentVariablesMap.discordWebhookToken] ?? ""),
};

export default environmentVariables;
