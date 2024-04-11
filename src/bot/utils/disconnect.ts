import type { VoiceState } from 'discord.js'

export const disconnect = (state: VoiceState) =>
  state.disconnect()
