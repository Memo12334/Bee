import { Message, PermissionsBitField, TextChannel } from 'discord.js'

export const purge = async (message: Message, arg: string) => {
  if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator)) return

  if (arg === 'clear') {
    const fetched = await message.channel.messages.fetch({ limit: 50 })
    const textchannel = message.channel as TextChannel
    textchannel.bulkDelete(fetched)
  }
}