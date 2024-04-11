import type { VoiceState } from 'discord.js'
import { disconnect } from './disconnect'

export const disconnectOnTimeOut = (
  state: VoiceState,
  timeout: number,
) =>
  setTimeout(() => {
    disconnect(state)
  }, timeout)
