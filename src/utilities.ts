export const validateDiscordWebhookToken = (discordToken: string) => {
  const regex = /[\w-]{2,}/;
  if (!regex.test(discordToken)) {
    throw new Error("Invalid discord webhook token.");
  }
  return Buffer.from(discordToken || "", "utf8").toString("base64");
};

export const validatDiscordWebhookId = (discordClientId: string) => {
  if (discordClientId.length !== 19) {
    throw new Error("Invalid Webhook ID length.");
  }
  return discordClientId;
};

export function removeIlegalDiscordChars(stringToFix: string): string {
  const ilegalDiscordCharacters = ["®", "™", "—"];
  const pattern = new RegExp(`[${ilegalDiscordCharacters.join("")}]`, "g");
  const replacedString = stringToFix.replaceAll(pattern, "");
  return replacedString;
}
