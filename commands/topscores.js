const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;
const db = require("../database/postgress");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("topscores")
    .setDescription("Find the top 10!"),
  async execute(interaction) {
    const query = {
      name: "fetch-top-10",
      text: 'select "userTag", "userScore" from users order by "userScore" desc limit 10',
    };
    db.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        array = [];
        array.push(":trophy: TOP SCORES: \n");
        res.rows.forEach((element) => {
          array.push("**" + element.userTag + "** : ");
          array.push(element.userScore + "\n");
        });
        string = array.join("");
        interaction.reply(`${string}`);
      }
    });
  },
};
