import { Client, GatewayIntentBits } from 'discord.js'
import { createVoiceStateHandler } from './create-voice-state-handler'

export const bot = (token: string) => {
  const client = new Client({
    intents: [
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.Guilds,
    ],
  })

  const toDisconnect = new Map<string, Timer>()

  client.on(
    'voiceStateUpdate',
    createVoiceStateHandler(toDisconnect, console.log),
  )

  client
    .login(token)
    .then(() => console.log('bot login successful'))
    .catch((e) =>
      console.log('got an error while trying to login', e),
    )
}
