const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;
const request = require("request");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription(
      "Type /wiki and the game and search a Wiki for pages related to that."
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("stellaris")
        .setDescription("Select content from Stellaris")
        .addStringOption((option) =>
          option
            .setName("search")
            .setDescription("What you want to search for?")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("eu4")
        .setDescription("Select content from Europa Universalis IV")
        .addStringOption((option) =>
          option
            .setName("search")
            .setDescription("What you want to search for?")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("hoi4")
        .setDescription("Select content from Hearts of Iron IV")
        .addStringOption((option) =>
          option
            .setName("search")
            .setDescription("What you want to search for?")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("ck3")
        .setDescription("Select content from Crusader Kings III")
        .addStringOption((option) =>
          option
            .setName("search")
            .setDescription("What you want to search for?")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    var sanitizer = require("sanitize")();
    selection = interaction.options.getSubcommand();
    message = interaction.options.getString("search");

    request.get(
      `https://${selection}.paradoxwikis.com/api.php?action=opensearch&search=${message}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(body);

          firstResult = body[1][0];

          if (!firstResult) {
            interaction.reply(`Sorry, I couldn't find anything for that...`);
            return true;
          }

          string = [];

          link = body[3];
          item = body[1];

          string.push("**I found these Wiki Pages:**\n");

          let i = -1;
          item.forEach((element) => {
            i++;
            console.log(element);
            string.push("[" + element + "]");
            string.push("(" + link[i] + ") \n");
          });

          string = string.join("");
          interaction.reply(`${string}`);
        } else {
          console.log(error);
          interaction.reply("Opps, something went wrong.");
        }
      }
    );
  },
};
