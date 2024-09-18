import { EmbedBuilder } from "discord.js"
import { BotSubcommandBuilder } from "phasebot/builders"

import { PhaseColour } from "~/lib/enums"
import { BotError } from "~/lib/errors"

import type { GuildMember } from "discord.js"

export default new BotSubcommandBuilder()
  .setName("skip")
  .setDescription("Skips the current song.")
  .setMetadata({ dmPermission: false })
  .setExecute(async (interaction) => {
    await interaction.deferReply()

    const member = interaction.member as GuildMember
    const channel = member.voice.channel

    if (!channel) {
      return void interaction.editReply(
        BotError.specificChannelOnlyCommand("voice").toJSON(),
      )
    }

    const queue = interaction.client.music.getQueue(channel.guildId)

    if (!queue?.currentSong) {
      return void interaction.editReply(
        new BotError("No songs were found in the queue.").toJSON(),
      )
    }

    queue.skip()

    return void interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(PhaseColour.Primary)
          .setAuthor({
            name: `Skipped by ${member.displayName}`,
            iconURL: member.displayAvatarURL(),
          })
          .setDescription(
            `Skipped **[${queue.currentSong.name}](${queue.currentSong.url})** by **${member.displayName}**.`,
          )
          .setFooter({ text: queue.currentSong.url }),
      ],
    })
  })
