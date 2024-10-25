import dotenv from 'dotenv';
import { validatDiscordClientId, validateDiscordToken } from './utils';
dotenv.config();

interface EnvironmentVariables {
  discordToken: string;
  discordClientId: string;
}

enum EnvVariables {
  discordToken = "DISCORD_TOKEN",
  discordClientId = "DISCORD_CLIENT_ID",
}

const envValidations = {
  [EnvVariables.discordToken]: validateDiscordToken,
  [EnvVariables.discordClientId]: validatDiscordClientId,
};

const envs = {} as EnvironmentVariables;

Object.keys(EnvVariables).forEach((key) => {
  const variable = EnvVariables[key];
  if (!process.env[variable]) throw new Error(`Environment Variable -> ${variable} is required`);
  envs[key] = envValidations[variable](process.env[variable]);
});

export default envs;