const db = require("../postgress");
require("dotenv").config();

module.exports = {
  init: (user_id, user_tag) => {
    const query = {
      name: "fetch-user",
      text: 'SELECT * FROM users where "userId" = $1',
      values: [user_id],
    };
    db.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        user = res.rows[0];
        if (!user) {
          const query = {
            name: "insert-user",
            text: 'INSERT INTO users ("userId", "userTag", "userScore") VALUES ($1, $2, $3)',
            values: [user_id, user_tag, 0],
            rowMode: "array",
          };
          let user = db.query(query, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log(`New User! Added ${user_tag} to the database.`);
              return res.rows[0];
            }
          });
        }
      }
    });
  },
};
