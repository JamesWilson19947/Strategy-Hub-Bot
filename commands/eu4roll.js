const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eu4roll')
        .setDescription('A command to roll a random EU4 nation. <europe/asia/africa>'),
    async execute(interaction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('eu4roll')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Major Powers',
                        description: 'A random major power',
                        value: 'major',
                    },
                    {
                        label: 'Europe',
                        description: 'A minor nation in Europe.',
                        value: 'europe',
                    },
                    {
                        label: 'Asia',
                        description: 'A minor nation in Asia',
                        value: 'asia',
                    },
                    {
                        label: 'Africa',
                        description: 'A minor nation in Africa',
                        value: 'africa',
                    }
                ]),
        );
        await interaction.reply({ content: 'Select your region', components: [row], ephemeral: true  });
    },
};
