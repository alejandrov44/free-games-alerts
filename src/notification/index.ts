import freeGamesList from "../crawler/index";
import { sendDiscordWebhook } from "./webhook";

void (async () => {
  await sendDiscordWebhook(await freeGamesList);
})();