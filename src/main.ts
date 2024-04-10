import { bot } from './bot'

export const main = () => {
  if (!process.env.TOKEN) {
    console.error('no token was provided')
    process.exit(1)
  }

  bot(process.env.TOKEN)
}
