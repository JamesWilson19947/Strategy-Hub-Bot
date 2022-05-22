const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    if (!interaction.isButton()) return;
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("roll6")
        .setLabel("Click to roll! (6 sides)")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("roll10")
        .setLabel("Click to roll! (10 sides)")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("roll100")
        .setLabel("Click to roll! (100 sides)")
        .setStyle("PRIMARY")
    );
    switch (interaction.customId) {
      case "roll6":
        number = randomIntFromInterval(0, 6);
        break;
      case "roll10":
        number = randomIntFromInterval(0, 10);
      default:
        number = randomIntFromInterval(0, 100);
    }

    interaction.update({
      content: `${interaction.user.toString()}\n\n **Your number is: ${number}** \n Click to roll again!`,
      components: [row],
    });
  },
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
