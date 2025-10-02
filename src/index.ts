import freeGamesList from "./crawler/index";
import { checkNewGames } from "./data/storage";
import environmentVariables from "./environment";
import { sendTelegramBot } from "./notification/telegram";
import { sendDiscordWebhook } from "./notification/webhook";

const main = async () => {
  const actualFreeGames = await freeGamesList();
  const newFreeGames = await checkNewGames(actualFreeGames);

  // eslint-disable-next-line no-console
  console.log("New Games:", newFreeGames);
  if (newFreeGames.length > 0) {
    if (environmentVariables.discordWebhookId && environmentVariables.discordWebhookToken) {
      await sendDiscordWebhook(newFreeGames);
      // eslint-disable-next-line no-console
      console.log("Discord Webhook done.");
    }
    if (environmentVariables.telegramBotToken) {
      await sendTelegramBot(newFreeGames);
      // eslint-disable-next-line no-console
      console.log("Telegram Bot done.");
    }
  }
};

await main();
