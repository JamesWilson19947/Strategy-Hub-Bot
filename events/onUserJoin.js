require("dotenv").config();

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    messages = require("../data/en-us-phrases.json");

    try {
      await member.guild.roles.fetch();
      let role = member.guild.roles.cache.find(
        (role) => role.name === process.env.USER_JOIN_ROLE_NAME
      );
      member.roles.add(role);
      console.log(`Added role ${role.name} to ${member.user.tag}`);

      let channel = await member.guild.channels.cache.find(
        (channel) => channel.name === process.env.BOT_CHANNEL
      );
      channel.send({ content: eval(messages["welcomeChannelMessage"]) });
      member
        .send(eval(messages["welcomeMessage"]))
        .then((message) =>
          console.log(`Sent message to ${member.user.tag}: ${message.content}`)
        )
        .catch(console.error);
    } catch (err) {
      console.error(err);
    }
  },
};
