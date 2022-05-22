module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (!interaction.isSelectMenu()) return;

        responses = [
            'may you fight well!',
            'you\'re in for a ride!',
            'may you fight for freedom!'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        if (interaction.customId === 'hoi4roll') {
            var data = require('../data/hoi4/countries.json');
        };
        if (interaction.customId === 'eu4roll') {
            var data = require('../data/eu4/countries.json');
        };
        if (interaction.customId === 'origin') {
            var data = require('../data/stellaris/origin.json');
        };

        selection = interaction.values[0];
        data = data[selection];
        try {
            const randomData = data[Math.floor(Math.random() * data.length)];
            interaction.reply(`${interaction.user.toString()} I give you: ${randomData}, ${randomResponse}`);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

    },
};
