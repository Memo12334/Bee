import { Message } from 'discord.js'

interface DeletedHistory {
  deleted: Date
  states: Message[]
}

const maxDelMsgs = 10

// Maps channel : deleted messages
const deletedMessages = new Map<string, DeletedHistory[]>()

// Maps messageId : edited messages
const messageHistory = new Map<string, Message[]>()

export const snipe = async (message: Message) => {
  const arg = message.content.split(' ').slice(1)[0]
  const n = Math.abs(parseInt(arg))
  if (isNaN(n) || n > maxDelMsgs) return

  const channel = message.channel.id
  const history = deletedMessages.get(channel)
  if (!history || history.length <= n) {
    return
  }

  const { deleted, states } = history[history.length - 1 - n]
  const { author } = states[0]

  let msg = ''
  msg += `Deleted on ${deleted.toLocaleString()} by ${author}:\n`

  for (const state of states) {
    msg += `${state.content}\n`
  }

  await message.channel.send(msg)
}

export const addDeleted = (message: Message) => {
  const channel = message.channel.id
  const history = deletedMessages.get(channel)
  let msges: Message[] = []

  if (messageHistory.has(message.id)) {
    msges = (messageHistory.get(message.id))!
    messageHistory.delete(message.id)
  }

  msges.push(message)

  if (!history) {
    deletedMessages.set(channel, [{
      deleted: new Date(),
      states: msges
    }])
  }
  else {
    if (history.length >= maxDelMsgs) {
      history.shift()
    }

    history.push({
      deleted: new Date(),
      states: msges
    })
  }
}

export const addEdited = (oldMessage: Message) => {
  const msg = messageHistory.get(oldMessage.id)
  if (msg) {
    msg.push(oldMessage)
  }
  else {
    messageHistory.set(oldMessage.id, [oldMessage])
  }
}
