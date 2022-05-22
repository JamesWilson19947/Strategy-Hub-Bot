module.exports = {
    name: 'guildMemberAdd',
    execute(guildMember) {
        console.log(guildMember)
        let role = guildMember.roles.cache.find(r => r.name === 'Knight')
        guildMember.roles.add(role);
    }
};