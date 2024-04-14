import { withStateInfo } from 'bot/formatting'
import type { VoiceState } from 'discord.js'

export const createLogger =
  (state: VoiceState, output: (message: string) => void) =>
  (message: string) =>
    output(withStateInfo(state, message))
