const db = require('../database/postgress');
const { Pool, Client } = require('pg')

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        console.log(`[${interaction.createdAt}][${interaction.guild.name}] ${interaction.user.tag} in #${interaction.channel.name} triggered a ${interaction.type} /${interaction.commandName}.`);
        const query = {
            name: 'fetch-user',
            text: 'SELECT * FROM users where "userId" = $1',
            values: [interaction.user.id],
        }
        db.query(query, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                user = res.rows[0]
                if (!user) {
                    const query = {
                        name: 'insert-user',
                        text: 'INSERT INTO users ("userId", "userTag", "userScore") VALUES ($1, $2, $3)',
                        values: [interaction.user.id, interaction.user.tag, 0],
                        rowMode: 'array'
                    }
                    let user = db.query(query, (err, res) => {
                        if (err) {
                            console.log(err.stack)
                        } else {
                            console.log(`New User! Added ${interaction.user.tag} to the database.`)
                            return res.rows[0]
                        }
                    })
                };
            }
        });   
    }
};