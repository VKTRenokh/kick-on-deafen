import type { VoiceState } from 'discord.js'

export const whitelist = ['830530156048285716']

export const except = (state: VoiceState) =>
  state.member?.user.bot || whitelist.includes(state.id)
