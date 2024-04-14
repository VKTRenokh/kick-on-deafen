import type { ToDisconnect } from 'bot/types'
import type { VoiceState } from 'discord.js'
import { canKick } from './can-kick'

export const canClear = (
  toDisconnect: ToDisconnect,
  newState: VoiceState,
) => toDisconnect.has(newState.id) && canKick(newState)
