import { EmbedBuilder } from "discord.js"
import { BotSubcommandBuilder } from "phasebot/builders"

import { distubeClient } from "~/lib/clients/distube"
import { PhaseColour } from "~/lib/enums"
import { BotError } from "~/lib/errors"

import { createProgressBar } from "./_utils"

import type { GuildMember } from "discord.js"

export default new BotSubcommandBuilder()
  .setName("pause")
  .setDescription("Pauses the currently playing song.")
  .setMetadata({ dmPermission: false })
  .setExecute(async (interaction) => {
    await interaction.deferReply()

    const member = interaction.member as GuildMember
    const channel = member.voice.channel

    if (!channel?.isVoiceBased()) {
      return void interaction.editReply(
        BotError.specificChannelOnlyCommand("voice").toJSON(),
      )
    }

    const queue = distubeClient.getQueue(channel.guildId)

    if (!queue) {
      return void interaction.editReply(
        new BotError("No songs were found in the queue.").toJSON(),
      )
    }

    const song = queue.songs[queue.songs.length - 1]!

    const songProgressBar = createProgressBar(
      queue.currentTime / queue.duration,
      "paused",
    )

    void queue.pause()

    void interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(PhaseColour.Primary)
          .setAuthor({
            name: `Paused by ${member.displayName}`,
            iconURL: member.displayAvatarURL(),
          })
          .setDescription(
            `\`${queue.formattedCurrentTime}\` ${songProgressBar} \`${song.formattedDuration}\``,
          )
          .setFooter({
            text: song.url ?? "Unknown",
          }),
      ],
    })
  })
