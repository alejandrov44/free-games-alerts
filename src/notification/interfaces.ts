interface EmbedFooter {
  icon_url?: string; // URL for the footer icon
  text: string; // Footer text
}

interface EmbedImage {
  url: string; // URL of the image
}

interface EmbedThumbnail {
  url: string; // URL of the thumbnail
}

interface EmbedVideo {
  url?: string; // URL of the video
}

interface EmbedProvider {
  name?: string; // Name of the provider
  url?: string; // URL of the provider
}

interface EmbedAuthor {
  icon_url?: string; // URL of the author's icon
  name: string; // Name of the author
  url?: string; // URL of the author
}

interface EmbedField {
  inline?: boolean; // Whether the field is inline
  name: string; // Name of the field
  value: string; // Value of the field
}

// Controls mentions in the message
interface AllowedMentions {
  parse?: ("roles" | "users" | "everyone")[]; // Allowed mention types
  replied_user?: boolean; // Whether to mention the replied user
  roles?: string[]; // Role IDs to mention
  users?: string[]; // User IDs to mention
}

interface Embed {
  author?: EmbedAuthor; // Author information
  color?: number; // Embed color as a hexadecimal (integer)
  description?: string; // Embed description
  fields?: EmbedField[]; // Fields for the embed (up to 25)
  footer?: EmbedFooter; // Footer information
  image?: EmbedImage; // Image for the embed
  provider?: EmbedProvider; // Provider information
  thumbnail?: EmbedThumbnail; // Thumbnail for the embed
  timestamp?: string; // ISO8601 timestamp for the embed
  title?: string; // Embed title
  url?: string; // URL for the embed title
  video?: EmbedVideo; // Video for the embed
}

export interface DiscordWebhookPayload {
  allowed_mentions?: AllowedMentions; // Controls mentions in the message
  avatar_url?: string; // Overrides the default avatar of the webhook
  components?: unknown; // Controls mentions in the message
  content?: string; // The message content (up to 2000 characters)
  embeds?: Embed[]; // Array of embed objects (up to 10)
  tts?: boolean; // If true, sends the message as a text-to-speech message
  username?: string; // Overrides the default username of the webhook
}
