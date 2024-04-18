import type { ToDisconnect } from 'bot/types'
import type { VoiceState } from 'discord.js'

export const clear = (
  toDisconnect: ToDisconnect,
  state: VoiceState,
) => {
  clearTimeout(toDisconnect.get(state.id))

  return toDisconnect.delete(state.id)
    ? 'cleared from toDisconnect'
    : "user wasn't in toDisconnect"
}
