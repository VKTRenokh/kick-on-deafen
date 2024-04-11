import type { VoiceState } from 'discord.js'
import { disconnect } from './disconnect'
import { disconnectOnTimeOut } from './disconnect-on-timeout'

export const createVoiceStateHandler =
  (toDisconnect: Map<string, Timer>) =>
  (oldState: VoiceState, newState: VoiceState) => {
    if (
      toDisconnect.has(newState.id) &&
      (!newState.deaf || newState.streaming)
    ) {
      clearTimeout(toDisconnect.get(newState.id))
      toDisconnect.delete(newState.id)
      return
    }

    if (!oldState.channel && newState.deaf) {
      toDisconnect.set(
        newState.id,
        disconnectOnTimeOut(
          newState,
          +(process.env.TIMEOUT ?? 5_000),
        ),
      )

      return
    }

    newState.deaf &&
      !newState.streaming &&
      disconnect(newState)
  }
