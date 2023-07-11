import { Message, PermissionFlagsBits, PermissionsBitField, TextChannel } from 'discord.js';
import { getRoleByName } from '../db/repos/rolesRepo';

const prefixes = ['!', '++', '.']

export const onMessage = async (message: Message) => {
  const prefix = message.content.slice(0, 1)
  if (!prefixes.some(p => p === prefix)) return

  const arg = message.content.slice(1).split(' ')[0]

  switch (prefix) {
    case '!':
      await handleRole(message, arg)
      break
    case '++':
      break
    case '.':
      await purge(message, arg)
      break
  }
}

const purge = async (message: Message, arg: string) => {
  if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator)) return

  if (arg === 'clear') {
    const fetched = await message.channel.messages.fetch({ limit: 50 })
    const textchannel = message.channel as TextChannel
    textchannel.bulkDelete(fetched)
  }
}

const handleRole = async (message: Message, arg: string) => {
  if (await getRoleByName(arg)) return

  const { guild, member } = message

  if (guild && member) {
    const userRole = member.roles.cache.find(r => r.name === arg)
    if (userRole) { // if user has role then remove
      if (member.roles.cache.has(userRole.id)) {
        member.roles.remove(userRole)
        message.reply(`You have been removed from the ${userRole.name} role.`)
      }
    }
    else {
      const role = guild.roles.cache.find(r => r.name === arg)
      member.roles.add(role!)
      message.reply(`You have been added to the ${arg} role.`)
    }
  }
}