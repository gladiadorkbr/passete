import { BotSubcommandBuilder } from "@phasejs/core/builders"

export default new BotSubcommandBuilder()
  .setName("server")
  .setDescription("Gets the ID of the server.")
  .setMetadata({ dmPermission: false })
  .setExecute((interaction) => {
    const id = interaction.guildId!

    void interaction.reply({
      content: id,
      ephemeral: true,
    })
  })
