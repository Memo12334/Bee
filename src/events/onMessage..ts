import { Message } from 'discord.js';
import { handleRole } from '../utils/handleRole';
import { snipe } from '../utils/snipe';
import { purge } from '../utils/purge';

const prefixes = ['!', '++snipe', '.']

export const onMessage = async (message: Message) => {
  const prefix = prefixes.find(p => message.content.startsWith(p))
  const arg = message.content.slice(1).split(' ')[0]

  switch (prefix) {
    case '!':
      await handleRole(message, arg)
      break
    case '++snipe':
      await snipe(message)
      break
    case '.':
      await purge(message, arg)
      break
  }
}





