import { CacheType, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "..";

export class SetAlarmCommand implements Command {
  name = "testalarmone";
  description = "Set a new manga alarm!";
  
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);

  async execute(interaction: CommandInteraction<CacheType>): Promise<any> {
    return interaction.reply("Pong!");
  }
}