import type { VoiceState } from 'discord.js'
import { disconnect } from './utils'
import { disconnectOnTimeOut } from './utils'
import { timeout } from './constants'
import { withStateInfo } from './formatting'

const createLogger =
  (state: VoiceState, output: (message: string) => void) =>
  (message: string) =>
    output(withStateInfo(state, message))

export const createVoiceStateHandler =
  (
    toDisconnect: Map<string, Timer>,
    logger: (message: string) => void,
  ) =>
  (oldState: VoiceState, newState: VoiceState) => {
    const log = createLogger(newState, logger)

    if (
      toDisconnect.has(newState.id) &&
      (!newState.deaf || newState.streaming)
    ) {
      clearTimeout(toDisconnect.get(newState.id))
      toDisconnect.delete(newState.id)
      log('disconnect')
      return
    }

    if (!oldState.channel && newState.deaf) {
      toDisconnect.set(
        newState.id,
        disconnectOnTimeOut(
          newState,
          +(process.env.TIMEOUT ?? timeout),
        ),
      )
      log('added to disconnect')

      return
    }

    newState.deaf &&
      !newState.streaming &&
      disconnect(newState)
    log('disconnected')
  }
