import type { VoiceState } from 'discord.js'

export const except = (
  state: VoiceState,
  whitelist: string[],
) => state.member?.user.bot || whitelist.includes(state.id)
