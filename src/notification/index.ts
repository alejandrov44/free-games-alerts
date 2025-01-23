import freeGamesList from "../crawler/index"
import { DiscordWebhookPayload } from "./interfaces";
import { sendDiscordWebhook } from "./webhook";

(async () => {
  await sendDiscordWebhook(await freeGamesList);
})();