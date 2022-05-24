const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;
const request = require("request");
const { MessageEmbed } = require("discord.js");
const { exit, title } = require("node:process");
const metascraper = require("metascraper")([
  require("metascraper-author")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-logo")(),
  require("metascraper-clearbit")(),
  require("metascraper-publisher")(),
  require("metascraper-title")(),
  require("metascraper-url")(),
]);
const { convert } = require("html-to-text");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription(
      "Type /wiki and the game and search a Wiki for pages related to that."
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("eos")
        .setDescription("Select content from Empire of Sins")
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
        .setName("ck2")
        .setDescription("Select content from Crusader Kings II")
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
    selection = interaction.options.getSubcommand();

    input = interaction.options.getString("search");
    message = input.replace(/[^\w\s]/gi, "");

    request.get(
      `https://${selection}.paradoxwikis.com/api.php?action=query&format=json&list=search&srsearch=${message}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(body);

          try {
            firstResult = body.query.search[0].title;
          } catch (e) {
            interaction.reply(`Sorry, I couldn't find anything for that...`);
            return true;
          }

          const got = require("got");

          const targetUrl =
            `https://${selection}.paradoxwikis.com/` + firstResult;
          (async () => {
            const { body: html, url } = await got(targetUrl);
            const metadata = await metascraper({ html, url });

            const resultsEmbed = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle(metadata.publisher)
              .setDescription(`Search: ${message}`)
              .setThumbnail(metadata.image);

            body.query.search.forEach((element) => {
              URLtitle = element.title.replace(/\s+/g, "%20");

              const snippet = convert(element.snippet, {
                wordwrap: 130,
              });

              newSnippet = snippet.replace(`${message}`, `**${message}**`);

              resultsEmbed.addField(
                `${element.title}`,
                `${newSnippet} \n [Link to ${element.title}](https://${selection}.paradoxwikis.com/${URLtitle})`,
                true
              );
            });
            interaction.reply({ embeds: [resultsEmbed] });
          })();
        } else {
          console.log(error);
          interaction.reply("Opps, something went wrong.");
        }
      }
    );
  },
};
