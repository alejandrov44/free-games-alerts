export interface DiscordWebhookPayload {
  content?: string; // The message content (up to 2000 characters)
  username?: string; // Overrides the default username of the webhook
  avatar_url?: string; // Overrides the default avatar of the webhook
  tts?: boolean; // If true, sends the message as a text-to-speech message
  embeds?: Embed[]; // Array of embed objects (up to 10)
  allowed_mentions?: AllowedMentions; // Controls mentions in the message
  components?: unknown; // Controls mentions in the message
}

interface Embed {
  title?: string; // Embed title
  description?: string; // Embed description
  url?: string; // URL for the embed title
  color?: number; // Embed color as a hexadecimal (integer)
  timestamp?: string; // ISO8601 timestamp for the embed
  footer?: EmbedFooter; // Footer information
  image?: EmbedImage; // Image for the embed
  thumbnail?: EmbedThumbnail; // Thumbnail for the embed
  video?: EmbedVideo; // Video for the embed
  provider?: EmbedProvider; // Provider information
  author?: EmbedAuthor; // Author information
  fields?: EmbedField[]; // Fields for the embed (up to 25)
}

// Sub-objects for embed
interface EmbedFooter {
  text: string; // Footer text
  icon_url?: string; // URL for the footer icon
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
  name: string; // Name of the author
  url?: string; // URL of the author
  icon_url?: string; // URL of the author's icon
}

interface EmbedField {
  name: string; // Name of the field
  value: string; // Value of the field
  inline?: boolean; // Whether the field is inline
}

// Controls mentions in the message
interface AllowedMentions {
  parse?: ("roles" | "users" | "everyone")[]; // Allowed mention types
  roles?: string[]; // Role IDs to mention
  users?: string[]; // User IDs to mention
  replied_user?: boolean; // Whether to mention the replied user
}