import { Message } from 'discord.js'
import { getRoleByName } from '../db/repos/rolesRepo'

export const handleRole = async (message: Message, arg: string) => {
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