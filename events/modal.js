const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "teamssplit") {
      // Get the data entered by the user
      const input = interaction.fields.getTextInputValue("teamsplitInput");
      const InputTeams = input.split("\n");

      // Remove any blank lines cuz da trolls, be trollin'
      var teams = InputTeams.filter(function (el) {
        return el != "";
      });

      if (teams.length < 2) {
        interaction.reply({
          content: `${interaction.user.toString()} you must enter at least two people on different lines...`,
          ephemeral: true,
        });
        return true;
      }

      let team1 = shuffle([...teams]); // spread to avoid mutating the original
      let team2 = team1.splice(0, teams.length >> 1);

      team1string = team1.join("\n • ");
      team2string = team2.join("\n • ");

      interaction.reply(
        `${interaction.user.toString()}\n\n **TEAM ONE:** \n • ${team1string.toUpperCase()} \n \n :crossed_swords: **VERSUS** :crossed_swords:  \n \n   **TEAM TWO :**  \n • ${team2string.toUpperCase()}`
      );
    }
  },
};
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
