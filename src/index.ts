import config from './config'

import { GatewayIntentBits, Client, Events } from 'discord.js'
import { onInteraction } from './events/onInteraction'
import { onReady } from './events/onReady'
import { onMessage } from './events/onMessage.'

(async () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
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

  try {
    await client.login(config.DISCORD_TOKEN)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()

