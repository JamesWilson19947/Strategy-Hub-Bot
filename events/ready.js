const DB = require("../database/postgress.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const statusArray = require("../data/richPresence.json");
    async function pickPresence() {
      const option = Math.floor(Math.random() * statusArray.length);

      try {
        await client.user.setPresence({
          activities: [
            {
              name: statusArray[option].content,
              type: statusArray[option].type,
              status: statusArray[option].status,
            },
          ],
          status: statusArray[option].status,
        });
      } catch (error) {
        console.error(error);
      }
    }

    setInterval(pickPresence, 3600 * 1000); // change every 3600 seconds (1 Hour)
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
