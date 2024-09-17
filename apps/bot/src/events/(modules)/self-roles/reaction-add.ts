import { GuildEmoji } from "discord.js"
import { BotEventBuilder } from "phasebot/builders"

import { ModuleId } from "@repo/config/phase/modules.ts"

import { parseHiddenContent } from "~/lib/utils"

import { updateRoles } from "./_utils"

export default new BotEventBuilder()
  .setName("messageReactionAdd")
  .setExecute(async (_, reaction, user) => {
    const reactionMessage = reaction.message.partial
      ? await reaction.message.fetch()
      : reaction.message

    if (!reactionMessage.inGuild()) return
    if (reactionMessage.author.id !== reaction.client.user.id) return

    const guildDoc = reaction.client.store.guilds.get(reactionMessage.guildId)
    const moduleData = guildDoc?.modules?.[ModuleId.SelfRoles]

    if (!moduleData?.enabled) return

    const messageId = parseHiddenContent(reactionMessage.content)
    const message = moduleData.messages.find(({ id }) => id === messageId)

    if (!message) return

    const reactionIndex = message.methods.findIndex(
      (method) =>
        method.emoji ===
        (reaction.emoji instanceof GuildEmoji
          ? reaction.emoji.id
          : reaction.emoji.name),
    )

    if (reactionIndex === -1) return

    const member =
      reactionMessage.guild.members.cache.get(user.id) ??
      (await reactionMessage.guild.members.fetch(user.id).catch(() => null))

    if (!member) return

    updateRoles(member, message, reactionIndex)
  })