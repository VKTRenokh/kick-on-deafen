import { Client, GatewayIntentBits } from 'discord.js'
import { disconnect } from './disconnect'
import { disconnectOnTimeOut } from './disconnect-on-timeout'

export const bot = (token: string, timeout?: number) => {
  const client = new Client({
    intents: [
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.Guilds,
    ],
  })

  const toDisconnect = new Map<string, Timer>()

  client.on('voiceStateUpdate', (oldState, newState) => {
    if (toDisconnect.has(newState.id) && !newState.deaf) {
      clearTimeout(toDisconnect.get(newState.id))
      toDisconnect.delete(newState.id)
      return
    }

    if (!oldState.channel && newState.deaf) {
      toDisconnect.set(
        newState.id,
        disconnectOnTimeOut(newState, timeout ?? 5_000),
      )

      return
    }

    newState.deaf && disconnect(newState)
  })

  client
    .login(token)
    .then(() => console.log('bot login successful'))
    .catch((e) =>
      console.log('got an error while trying to login', e),
    )
}
