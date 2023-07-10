import { Client, REST, Routes } from 'discord.js';
import { CommandList } from '../commands/_commandList';
import config from '../config';

export const onReady = async (client: Client) => {
  const rest = new REST({ version: '9' }).setToken(client.token!)

  const commandData = CommandList.map(command => command.data.toJSON())

  await rest.put(
    Routes.applicationGuildCommands(
      client.user?.id || 'missing id',
      config.GUILD_ID
    ),
    { body: commandData }
  )

  console.log('Successfully registered application commands.')
}