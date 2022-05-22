const addUserIfNotExists = require("../database/queries/addUserIfNotExists");
const { Pool, Client } = require("pg");

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    console.log(
      `[${interaction.createdAt}][${interaction.guild.name}] ${interaction.user.tag} in #${interaction.channel.name} triggered a ${interaction.type} /${interaction.commandName}.`
    );
    addUserIfNotExists.init(interaction.user.id, interaction.user.tag);
  },
};
