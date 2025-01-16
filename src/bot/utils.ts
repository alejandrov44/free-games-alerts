export const validateDiscordToken = (discordToken: string) => {
  const regex = /[\w-]+\.[\w-]+\.[\w-]+/;
  if (!regex.test(discordToken)) {
    throw new Error('Invalid discord token.');
  }
  return Buffer.from(discordToken || '', 'utf-8').toString('base64');
};

export const validatDiscordClientId = (discordClientId: string) => {
  if (discordClientId.length !== 19) throw new Error('Invalid API key length');
  return discordClientId;
};