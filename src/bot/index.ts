import {
  CommandInteraction,
  Client,
  Events,
  GatewayIntentBits,
  REST as DiscordRestClient,
  Routes,
} from "discord.js";
import { InteractionHandler } from "./handler";
import envs from "../environment";

class FreeGameTrackerApplication {
  private client: Client;
  private discordRestClient: DiscordRestClient;
  private interactionHandler: InteractionHandler;
  private discordToken = Buffer.from(envs.discordToken, 'base64').toString('utf-8');

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      shards: "auto",
      failIfNotExists: false,
    });
    this.discordRestClient = new DiscordRestClient().setToken(this.discordToken);
    this.interactionHandler = new InteractionHandler();
  }

  start() {
    try {
      this.addClientEventHandlers();
      this.registerSlashCommands();
      this.client.login(this.discordToken);
    } catch (error) {
      console.error("Error starting bot", error);
    }
  }

  registerSlashCommands() {
    const commands = this.interactionHandler.getSlashCommands();
    this.discordRestClient
      .put(Routes.applicationCommands(envs.discordClientId), { body: commands })
      .then((data: any) => console.log(`Successfully registered ${data.length} global application (/) commands`))
      .catch((err) => console.error("Error registering application (/) commands", err));
  }

  addClientEventHandlers() {
    this.client.on(Events.InteractionCreate, (interaction) => {
      this.interactionHandler.handleInteraction(interaction as CommandInteraction);
    });

    this.client.on(Events.ClientReady, (readyClient) => {
      console.log(`Ready! Logged in as ${readyClient.user.tag}! 🤖`);
    });

    this.client.on(Events.Error, (err: Error) => {
      console.error("Client error", err);
    });
  }
}

const app = new FreeGameTrackerApplication();
app.start();