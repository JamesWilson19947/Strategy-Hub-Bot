const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('returns a number from 0-100'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('roll6')
                    .setLabel('Click to roll! (6 sides)')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('roll10')
                    .setLabel('Click to roll! (10 sides)')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('roll100')
                    .setLabel('Click to roll! (100 sides)')
                    .setStyle('PRIMARY'),
            ); 
        await interaction.reply({ content: 'Click a button', components: [row] });
        
    },
};
