const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('teamsplit')
        .setDescription('Split teams with ease!'),
    async execute(interaction) {
        const modal = new Modal()
            .setCustomId('teamssplit')
            .setTitle('Split people into teams');
        // Add components to modal
        // Create the text input components
        const hobbiesInput = new TextInputComponent()
            .setCustomId('teamsplitInput')
            .setLabel("Enter each name on a new line...")
            // Paragraph means multiple lines of text.
            .setStyle('PARAGRAPH');
        // An action row only holds one text input,
        // so you need one action row per text input.
        const secondActionRow = new MessageActionRow().addComponents(hobbiesInput);
        // Add inputs to the modal
        modal.addComponents(secondActionRow);
        // Show the modal to the user
        await interaction.showModal(modal);




    },
};
