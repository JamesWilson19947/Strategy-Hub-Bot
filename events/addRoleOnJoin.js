module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
         var role = member.guild.roles.find("name", "Knight");
         if (role) {
          member.addRole("150999163126022144");
         } 
    }
};