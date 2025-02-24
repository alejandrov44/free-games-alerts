import freeGamesList from "./crawler/index";
import { checkNewGames } from "./data/storage";
import { sendDiscordWebhook } from "./notification/webhook";

(async () => {
  const actualFreeGames = await freeGamesList;
  const newFreeGames = await checkNewGames(actualFreeGames);

  console.log("New Games:", newFreeGames);
  await sendDiscordWebhook(newFreeGames);
})();
