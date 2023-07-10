import { CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';

export interface Command {
  data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand"> | SlashCommandSubcommandBuilder
  run: (interaction: CommandInteraction) => Promise<void>
}