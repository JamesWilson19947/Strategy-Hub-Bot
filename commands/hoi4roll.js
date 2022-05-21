const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hoi4roll')
        .setDescription('A command to roll a random major in Hearts of Iron: IV. <minor>'),
    async execute(interaction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('hoi4roll')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Major',
                        description: 'A random major power',
                        value: 'major',
                    },
                    {
                        label: 'Minor',
                        description: 'A random minor power.',
                        value: 'minor',
                    }
                ]),
        );
        await interaction.reply({ content: 'Select Major/Minor', components: [row], ephemeral: true  });
    },
};
