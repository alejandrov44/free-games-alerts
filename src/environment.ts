import dotenv from "dotenv";
import { validatDiscordWebhookId, validateDiscordWebhookToken } from "./utilities";
dotenv.config();

interface EnvironmentVariables {
  discordWebhookToken: string;
  discordWebhookId: string;
}

enum EnvVariables {
  discordWebhookToken = "DISCORD_WEBHOOK_TOKEN",
  discordWebhookId = "DISCORD_WEBHOOK_ID",
}

const envValidations = {
  [EnvVariables.discordWebhookToken]: validateDiscordWebhookToken,
  [EnvVariables.discordWebhookId]: validatDiscordWebhookId,
};

const envs = {} as EnvironmentVariables;

Object.keys(EnvVariables).forEach((key) => {
  const variable = EnvVariables[key] as EnvVariables;
  if (!process.env[variable]) throw new Error(`Environment Variable -> ${variable} is required`);
  envs[key] = envValidations[variable](process.env[variable]);
});

export default envs;