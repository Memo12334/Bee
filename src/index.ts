import config from './config'

import { GatewayIntentBits, Client, Events, Partials } from 'discord.js'
import { onInteraction } from './events/onInteraction'
import { onReady } from './events/onReady'
import { onMessage } from './events/onMessage.'
import { addDeleted } from './utils/snipe'
import { error } from 'console'

(async () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Message]
  })

  client.on(Events.ClientReady, async () => {
    await onReady(client)
  })

  client.on(Events.InteractionCreate, async (interaction) => {
    await onInteraction(interaction)
  })

  client.on(Events.MessageCreate, async (message) => {
    await onMessage(message)
  })

  client.on(Events.MessageDelete, async (message) => {
    if (message.partial) {
      return
    }

    await addDeleted(message)
  })

  try {
    await client.login(config.DISCORD_TOKEN)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()

