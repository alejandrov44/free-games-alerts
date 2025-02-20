import freeGamesList from "./crawler/index";
import { checkNewGames } from "./data/storage";
import { sendDiscordWebhook } from "./notification/webhook";

void (async () => {
  const actualFreeGames = await freeGamesList;
  const newFreeGames = await checkNewGames(actualFreeGames);
  // eslint-disable-next-line no-console
  console.log("New Games: ", newFreeGames);
  await sendDiscordWebhook(newFreeGames);
})();