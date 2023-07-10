import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping!'),
  run: async (interaction) => {
    interaction.reply(`Pong! Latency ${Math.round(interaction.client.ws.ping)}ms`)
  }
} 