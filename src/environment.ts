import dotenv from "dotenv-safe";
import {
  validatDiscordWebhookId,
  validateDiscordWebhookToken,
} from "./utilities";
import path from "node:path";

dotenv.config({
  example: path.resolve(import.meta.dirname, "../.env.example"),
});

interface EnvironmentVariables {
  discordWebhookToken: string;
  discordWebhookId: string;
}

enum EnvVariables {
  discordWebhookToken = "DISCORD_WEBHOOK_TOKEN",
  discordWebhookId = "DISCORD_WEBHOOK_ID",
}

const envs: EnvironmentVariables = {
  discordWebhookId: validatDiscordWebhookId(
    process.env[EnvVariables.discordWebhookId] ?? ""
  ),
  discordWebhookToken: validateDiscordWebhookToken(
    process.env[EnvVariables.discordWebhookToken] ?? ""
  ),
};

export default envs;
