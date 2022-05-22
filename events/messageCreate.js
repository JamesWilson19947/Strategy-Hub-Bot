const addUserIfNotExists = require('../database/queries/addUserIfNotExists');
const addUserPoints = require('../database/queries/addUserPoints');
const { Pool, Client } = require('pg')

module.exports = {
    name: 'messageCreate',
    execute(message) {
        console.log(`[${message.createdAt}][${message.guild.name}] ${message.author.tag} in #${message.channel.name}: ${message.content}`);
        addUserIfNotExists.init(message.author.id, message.author.tag);
        addUserPoints.init(message.author.id, 1); 
    }
};