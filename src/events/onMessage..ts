import { Message } from 'discord.js';
import { getRoleByName } from '../db/repos/rolesRepo';

export const onMessage = async (message: Message) => {
  if (!message.content.startsWith('!')) return

  const arg = message.content.slice(1).split(' ')[0]
  const role = await getRoleByName(arg)

  const userRole = message.member!.roles.cache.find(r => r.name === arg)

  if (role) {
    if (userRole) {
      if (message.member!.roles.cache.has(userRole.id)) {
        message.member!.roles.remove(userRole)
        message.reply(`You have been removed from the ${userRole.name} role.`)
      }
    }
    else {
      const role = message.guild!.roles.cache.find(r => r.name === arg)
      message.member!.roles.add(role!)
      message.reply(`You have been added to the ${arg} role.`)
    }
  }
}