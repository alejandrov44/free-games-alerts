import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  name: string;
  description?: string;

  slashCommandConfig: SlashCommandBuilder;

  execute(interaction: CommandInteraction): Promise<any>;
}