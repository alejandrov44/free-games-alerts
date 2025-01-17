export const validateDiscordWebhookToken = (discordToken: string) => {
  const regex = /[\w-]+\-[\w-]+/;
  if (!regex.test(discordToken)) throw new Error('Invalid discord webhook token.');
  return Buffer.from(discordToken || '', 'utf-8').toString('base64');
};

export const validatDiscordWebhookId = (discordClientId: string) => {
  if (discordClientId.length !== 19) throw new Error('Invalid Webhook ID length.');
  return discordClientId;
};