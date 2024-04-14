import type { VoiceState } from 'discord.js'

export const withStateInfo = (
  state: VoiceState,
  message: string,
) =>
  message +
  ` [ ${state.member?.id} - ${state.member?.nickname} ]`
