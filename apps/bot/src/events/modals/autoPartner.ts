import * as Discord from 'discord.js'
import * as Utils from '#src/utils/index.js'
import * as Schemas from '@repo/utils/schemas'


export default Utils.clientModalEvent({
  customId: /autopartner\.advert/,
  fromMessage: false,
  async execute(client, interaction) {

    // Returns error if advert includes major server pings.

    const advertText = interaction.fields.getTextInputValue('autopartner.advert.text')

    if (advertText.includes('@everyone') || advertText.includes('@here')) return Utils.clientError(
      interaction,
      'No can do!',
      'Adverts cannot include @everyone or @here pings.'
    )


    // Finds and updates the server advert schema, returns error if no schema.

    const guildPartnerSchema = await Schemas.AutoPartners.findOne({ guild: interaction.guildId })

    if (!guildPartnerSchema) return Utils.clientError(
      interaction,
      'Well, this is awkward..',
      Utils.PhaseError.Unknown
    )

    guildPartnerSchema.advert = advertText
    await guildPartnerSchema.save()


    // Sends advert update confirmation message.

    interaction.reply({
      embeds: [
        new Discord.EmbedBuilder()
        .setColor(Utils.PhaseColour.Primary)
        .setDescription(`Auto-Partner advert has been set to the following:\n\n\`\`\`${guildPartnerSchema.advert}\`\`\``)
        .setTitle(Utils.PhaseEmoji.Success + 'Advert Updated')
      ],
    })


    // Loops over partner list and edits the messages.

    for (const partner of guildPartnerSchema.partners) {

      const partnerChannel = client.channels.cache.get(partner.channelId) as Discord.TextChannel | undefined
      const partnerMessage = partnerChannel?.messages.fetch(partner.messageId)

      partnerMessage?.then(message => message.edit(advertText)).catch(() => { return })

    }

  }
})