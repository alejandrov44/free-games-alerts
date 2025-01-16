import freeGamesList from "../crawler/index"
import { DiscordWebhookPayload } from "./interfaces";
import { formatGamesForWebhook, sendWebhook } from "./webhook";

(async () => {
  const content = formatGamesForWebhook(await freeGamesList);
  console.log(content);

  const body: DiscordWebhookPayload = {
    content
  }

  await sendWebhook(body);
})();