import type { VoiceState } from 'discord.js'
import { disconnect } from '../utils'
import type { ToDisconnect } from 'bot/types'
import { canClear } from './utils/can-clear'
import { clear } from './utils/clear'
import { canKick } from './utils/can-kick'
import { add } from './utils/add'
import { createLogger } from './logger'

export const createHandler =
  (
    toDisconnect: ToDisconnect,
    logger: (message: string) => void,
  ) =>
  (oldState: VoiceState, newState: VoiceState) => {
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

    canKick(newState) && disconnect(newState)
    log('disconnected')
  }
