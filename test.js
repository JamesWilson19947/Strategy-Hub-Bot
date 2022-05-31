const supertest = require("supertest");
const fs = require("fs");
const path = require("path");
const { Client, Collection, Intents } = require("discord.js");
const { default: nodeCluster } = require("cluster");
const { exit } = require("process");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

// Load enviroment variables
require("dotenv").config();

describe("Load commands...", function () {
  it("We should be able to load the commands", function (done) {
    try {
      client.commands = new Collection();
      const commandsPath = path.join(__dirname, "commands");
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe("Create an interaction...", function () {
  it("We should be able to create an interaction", function (done) {
    try {
      // Listen for commands
      client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) done("Failed to create an interaction.");
        try {
          await command.execute(interaction);
        } catch (error) {
          done(error);
        }
      });
      done();
    } catch (err) {
      done(err);
    }
  });
});
describe("Load the events...", function () {
    it("We should be able to load the events", function (done) {
      try {
        const eventsPath = path.join(__dirname, "events");
        const eventFiles = fs
          .readdirSync(eventsPath)
          .filter((file) => file.endsWith(".js"));
        
        for (const file of eventFiles) {
          const filePath = path.join(eventsPath, file);
          const event = require(filePath);
          if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
          } else {
            client.on(event.name, (...args) => event.execute(...args));
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  })

  describe("Login and logout as the bot", function () {
    it("We should be able to login and logout of the bot", function (done) {
      try {
        client.login(process.env.DISCORD_TOKEN);
        client.destroy(); 
        done();
      } catch (err) {
        done(err);
      }
      exit(0);
    });
  })