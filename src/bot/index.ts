import { Client, GatewayIntentBits } from 'discord.js'

export const bot = (token: string) => {
  const client = new Client({
    intents: [GatewayIntentBits.GuildVoiceStates],
  })

  client
    .login(token)
    .then(() => console.log('bot login successful'))
    .catch((e) =>
      console.log('got an error while trying to login', e),
    )
}
