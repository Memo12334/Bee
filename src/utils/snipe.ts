import { Message } from 'discord.js'

interface DeletedHistory {
  deleted: Date
  states: Message[]
}

// Maps channel : deleted messages
const deletedMessages = new Map<string, DeletedHistory[]>()
const maxDelMsgs = 10

export const snipe = async (message: Message, arg: string) => {
  const channel = message.channel.id
  const history = deletedMessages.get(channel)

  if (!history) {
    return
  }

  let msg = ''
  for (const item of history) {
    const { deleted, states } = item
    const { author, content } = states[0]

    msg += `Deleted on ${deleted.toLocaleString()} by ${author.username}:\n`
    msg += `${content}\n\n`
  }

  await message.channel.send(msg)
}

export const addDeleted = (message: Message) => {
  const channel = message.channel.id
  const history = deletedMessages.get(channel)

  if (!history) {
    deletedMessages.set(channel, [{
      deleted: new Date(),
      states: [message]
    }])
  }
  else {
    history.push({
      deleted: new Date(),
      states: [message]
    })
  }
}
