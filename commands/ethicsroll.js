const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ethicsroll")
    .setDescription("A command to random ethics"),
  async execute(interaction) {
    delete require.cache[require.resolve("../data/stellaris/ethics.json")];
    var jsonData = require("../data/stellaris/ethics.json");

    // Stellaris allows 3 points for ethics
    var points = 3;

    // We shall store the ethics here
    var ethics = [];
    var ethicData = jsonData["empireEthics"];

    var loop = 3;
    while (points > 0) {
      // Select a random ethic from the group
      let randomEthicGroup = randomIntFromInterval(0, loop);
      let randomEthic = randomIntFromInterval(0, 1);
      let luck = randomIntFromInterval(0, 20);
      let ethic = ethicData[randomEthicGroup][randomEthic];

      if (loop == 3 && luck == 20) {
        points = 0;
        ethics.push(`Gestalt Consciousness`);
        continue;
      }

      // Remove this from the array so we cannot select it twice.
      ethicData.splice(randomEthicGroup, 1);
      loop = loop - 1;

      //Roll for a chance of this ethic being fanatic
      let fanatic = randomIntFromInterval(0, 1);
      if (fanatic == 1 && points > 1) {
        ethics.push(`Fanatic ${ethic}`);
        points = points - 2;
      } else {
        ethics.push(`${ethic}`);
        points = points - 1;
      }
    }

    const ethicsDesc = ethics.sort((a, b) => b.length - a.length);

    ethicsOutput = ethicsDesc.join(" and ");

    await interaction.reply(
      `${interaction.user.toString()} your empire will be a **${ethicsOutput}**`
    );
  },
};
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
