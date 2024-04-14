import type { VoiceState } from 'discord.js'

export const canKick = (voiceState: VoiceState) =>
  voiceState.deaf && !voiceState.streaming
