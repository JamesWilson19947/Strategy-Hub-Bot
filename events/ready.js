module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setPresence({ activities: [{ name: `a simulation where I beat you at Stellaris...`, type: `PLAYING`}]})
    },
};
