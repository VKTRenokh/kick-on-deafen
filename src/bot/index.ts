import { Client, GatewayIntentBits } from 'discord.js'
import { createHandler } from './voice'

const handleLogin = () => {
  console.log('bot login successful')
}

const handleLoginError = (error: unknown) => {
  console.log('got an error while trying to login', error)
}

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
    createHandler(toDisconnect, console.log),
  )

  client
    .login(token)
    .then(handleLogin)
    .catch(handleLoginError)
}
