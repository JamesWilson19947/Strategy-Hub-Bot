const { SlashCommandBuilder } = require("@discordjs/builders");
const jsonfile = require("jsonfile");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("karma")
    .setDescription("View, modify, or list karma points for a user.")
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("List the top 10 users by karma.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("add the karma points for a user.")
        .addUserOption((option) =>
          option.setName("user").setDescription("The user to modify the karma points for.")
        )
        .addIntegerOption((option) =>
          option.setName("points").setDescription("The number of karma points to set.")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("show")
        .setDescription("Show the karma points for a user.")
        .addUserOption((option) =>
          option.setName("user").setDescription("The user to show the karma points for.")
        )
    ),
    
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "list") {
            const filepath = "./db/users.json";
            let data;

            try {
                data = jsonfile.readFileSync(filepath);
            } catch (err) {
                if (err.code === "ENOENT") {
                    data = {};
                } else {
                    console.error(err);
                    return interaction.reply("An error occurred while reading the user data.");
                }
            }

            const users = Object.entries(data)
                .sort(([, a], [, b]) => b.karma - a.karma)
                .slice(0, 10);

            const lines = users.map(([userID, { karma }], index) => {
                const username = interaction.guild.members.cache.get(userID)?.user.username ?? "Unknown User";
                return `${index + 1}. ${username}: ${karma}`;
            });

            const response = lines.length > 0
                ? "The top 10 users by karma are:\n" + lines.join("\n")
                : "There are no users with karma.";

            return interaction.reply(response);
        }


        const user = interaction.options.getUser("user");
        const points = Number.isInteger(interaction.options.getInteger("points"))
            ? interaction.options.getInteger("points")
            : 0;


        const filepath = "./db/users.json";
        let data;

        try {
            data = jsonfile.readFileSync(filepath);
        } catch (err) {
            if (err.code === "ENOENT") {
                data = {};
            } else {
                console.error(err);
                return interaction.reply("An error occurred while reading the user data.");
            }
        }

        const userID = user.id;
        const userRoleNames = interaction.member.roles.cache.map(role => role.name);

        if (subcommand === "add") {
            if (!userRoleNames.includes("Siege Engineer") && !userRoleNames.includes("Emperor")) {
                return interaction.reply("You do not have permission to use this command.");
            }
        
            const currentKarma = data[userID]?.karma ?? 0;
            const newKarma = currentKarma + points;
            const verb = points >= 0 ? "added" : "removed";
            data[userID] = { karma: Math.max(0, newKarma) };
        
            try {
                jsonfile.writeFileSync(filepath, data);
                return interaction.reply(`${verb.charAt(0).toUpperCase() + verb.slice(1)} ${Math.abs(points)} karma points to <@${userID}> (new karma: ${data[userID].karma}).`);
            } catch (err) {
                console.error(err);
                return interaction.reply("An error occurred while writing the user data.");
            }
        }

        if (subcommand === "show") {
            const user = interaction.options.getUser("user");
            const filepath = "./db/users.json";
            let data;
        
            try {
                data = jsonfile.readFileSync(filepath);
            } catch (err) {
                if (err.code === "ENOENT") {
                    data = {};
                } else {
                    console.error(err);
                    return interaction.reply("An error occurred while reading the user data.");
                }
            }
        
            const userID = user.id;
            const username = user.username;
            const karma = data[userID]?.karma ?? 0;
        
            return interaction.reply(`${username} has ${karma} karma points.`);
          }
    },        
};
