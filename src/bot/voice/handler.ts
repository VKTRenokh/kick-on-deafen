import { whitelist } from '$constants'
import { disconnect } from '$utils'
import type { ToDisconnect } from 'bot/types'
import type { VoiceState } from 'discord.js'
import { except } from './except'
import { createLogger } from './logger'
import { add, canClear, canKick, clear } from './utils'

export const createHandler =
  (
    toDisconnect: ToDisconnect,
    logger: (message: string) => void,
  ) =>
  (oldState: VoiceState, newState: VoiceState) => {
    if (except(newState, whitelist)) {
      return
    }

    const log = createLogger(newState, logger)

    if (canClear(toDisconnect, newState)) {
      log(clear(toDisconnect, newState))
      return
    }

    if (!oldState.channel && newState.deaf) {
      add(toDisconnect, newState)
      log('added to disconnect')

      return
    }

    canKick(newState) && (
      disconnect(newState),
      log('disconnected')
    )
  }
