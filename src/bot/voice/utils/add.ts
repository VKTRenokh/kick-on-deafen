import { timeout as defaultTimeout } from 'bot/constants'
import type { ToDisconnect } from 'bot/types'
import { disconnectOnTimeOut } from 'bot/utils'
import type { VoiceState } from 'discord.js'

export const add = (
  toDisconnect: ToDisconnect,
  newState: VoiceState,
  timeout?: number,
) => {
  toDisconnect.set(
    newState.id,
    disconnectOnTimeOut(
      newState,
      timeout ?? defaultTimeout,
    ),
  )
}
