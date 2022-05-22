const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;
const db = require("../database/postgress");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("myscore")
    .setDescription("Find your score!"),
  async execute(interaction) {
    const query = {
      name: "fetch-user",
      text: 'SELECT * FROM users where "userId" = $1',
      values: [interaction.user.id],
    };
    db.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        user = res.rows[0];
        if (!user) {
          interaction.reply(
            `Hey ${interaction.user.toString()}, I don\'t have a record of you, but I do now. You have 0 points.`
          );
        } else {
          interaction.reply(
            `Hey ${interaction.user.toString()}, You have ${
              user.userScore
            } points.`
          );
        }
      }
    });
  },
};
