import freeGamesList from "../crawler/index";
import { sendDiscordWebhook } from "./webhook";

await (async () => {
  await sendDiscordWebhook(await freeGamesList);
})();