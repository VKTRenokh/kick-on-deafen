import type { ToDisconnect } from 'bot/types'
import { disconnectOnTimeOut } from 'bot/utils'
import type { VoiceState } from 'discord.js'

export const add = (
  toDisconnect: ToDisconnect,
  newState: VoiceState,
) => {
  toDisconnect.set(
    newState.id,
    disconnectOnTimeOut(newState, 5_000),
  )
}
