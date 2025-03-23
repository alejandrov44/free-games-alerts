import freeGamesList from "./crawler/index";
import { checkNewGames } from "./data/storage";
import { sendDiscordWebhook } from "./notification/webhook";

const main = async () => {
  const actualFreeGames = await freeGamesList();
  const newFreeGames = await checkNewGames(actualFreeGames);

  // eslint-disable-next-line no-console
  console.log("New Games:", newFreeGames);
  await sendDiscordWebhook(newFreeGames);
};

await main();
