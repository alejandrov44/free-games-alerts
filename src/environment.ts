import path from "node:path";
import dotenv from "dotenv-safe";
import { validatDiscordWebhookId, validateDiscordWebhookToken } from "./utilities";

dotenv.config({ example: path.resolve(import.meta.dirname, "../.env.example") });

interface EnvironmentVariables {
  discordWebhookId: string;
  discordWebhookToken: string;
}

enum EnvironmentVariablesMap {
  discordWebhookId = "DISCORD_WEBHOOK_ID",
  discordWebhookToken = "DISCORD_WEBHOOK_TOKEN",
}

const environmentVariables: EnvironmentVariables = {
  discordWebhookId: validatDiscordWebhookId(process.env[EnvironmentVariablesMap.discordWebhookId] ?? ""),
  discordWebhookToken: validateDiscordWebhookToken(process.env[EnvironmentVariablesMap.discordWebhookToken] ?? ""),
};

export default environmentVariables;
