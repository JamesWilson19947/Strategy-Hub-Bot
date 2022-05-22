const db = require('../postgress');
require('dotenv').config()

module.exports = {
    init: (user_id, points) => {
        if(!points){
            return false; 
        }
        const query = {
            name: 'user-add-points',
            text: 'UPDATE users set "userScore" = "userScore" + $1 where "userId" = $2 ',
            values: [points, user_id],
            rowMode: 'array'
        }
        let user = db.query(query, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                return res.rows[0]
            }
        })
    }
}