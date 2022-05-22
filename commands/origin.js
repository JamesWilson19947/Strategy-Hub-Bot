const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('origin')
        .setDescription('A command to roll Stellaris Origin.'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('origin')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'Balanced origin',
                            description: 'Roll a balanced origin',
                            value: 'balancedOrigins',
                        },
                        {
                            label: 'Any Origin',
                            description: 'Roll any origin.',
                            value: 'origin',
                        }
                    ]),
            );
        await interaction.reply({ content: 'Select balanced or any origin', components: [row], ephemeral: true });
    },
};