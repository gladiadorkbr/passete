import { EmbedBuilder, GuildTextBasedChannel } from "discord.js"
import { BotCommandBuilder } from "phasebot/builders"

import { PhaseColour } from "~/lib/enums"
import { errorMessage } from "~/lib/utils"

export default new BotCommandBuilder()
  .setName("purge")
  .setDescription("Bulk deletes messages from the channel.")
  .setDMPermission(false)
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("The number of messages to purge (max 100).")
      .setMaxValue(100)
      .setMinValue(1)
      .setRequired(true),
  )
  .addUserOption((option) =>
    option
      .setName("author")
      .setDescription("The author of the messages.")
      .setRequired(false),
  )
  .setExecute(async (interaction) => {
    const amount = interaction.options.getInteger("amount", true)
    const author = interaction.options.getUser("author", false)

    const channel = interaction.channel as GuildTextBasedChannel

    let fetchedMessages = await channel.messages.fetch({ limit: amount })

    if (author) {
      fetchedMessages = fetchedMessages.filter(
        (message) => message.author.id == author.id,
      )
    }

    const deletedMessages = await channel.bulkDelete(fetchedMessages, true)

    if (!deletedMessages.size) {
      return interaction.reply(
        errorMessage({
          title: "Messages Not Found",
          description:
            "No messages were found.\n\n**Developer Note:**\nDiscord doesn't allow bots to purge (bulk delete) messages that older than 14 days. If you need to purge the entire channel, run `/scrub` instead.",
        }),
      )
    }

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(PhaseColour.Primary)
          .setDescription(
            `Purged **${deletedMessages.size}** messages in total` +
              `${author ? ` sent by ${author}` : "."}`,
          )
          .setTitle("Messages Purged"),
      ],
    })
  })
