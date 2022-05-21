const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bored')
        .setDescription('suggests an activity if your bored'),
    async execute(interaction) {
        request.get(
            'https://www.boredapi.com/api/activity',
            { json: { key: 'value' } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    interaction.reply(body.activity)
                }else{
                    console.log(error)
                    interaction.reply('Opps, something went wrong.')
                }
            }
        );
    },
};
