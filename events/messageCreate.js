const { Pool, Client } = require("pg");

module.exports = {
  name: "messageCreate",
  execute(message) {
    console.log(
      `[${message.createdAt}][${message.guild.name}] ${message.author.tag} in #${message.channel.name}: ${message.content}`
    );
    
  },
};
