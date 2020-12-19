const config = require('../config.json')
module.exports = {
    name: 'welcome',
    description: "welcome",
    async execute(message, args, Discord) {
        if (message.member.roles.cache.has(config.Perms1) || message.member.roles.cache.has(config.Perms2)) {
            message.channel.bulkDelete(1)
            const newEmbed1 = new Discord.MessageEmbed()
                .setColor('0000ff00')
                .setTitle('Welcome to the server there are a few rules and lets get to a 100 members')
                .setURL('https://steamcommunity.com/groups/holycowgang')
                .setDescription('Rules')
                .addFields({ name: 'Rule 1', value: 'Be nice to each other' }, { name: 'Rule 2', value: 'No swearing' }, { name: 'Rule 3', value: 'No spam' }, { name: 'Also join the steam group', value: 'https://steamcommunity.com/groups/holycowgang' })
                .setImage('https://i2.ruliweb.com/thumb/20/11/22/175ef71468d4f594b.jpg')
            message.channel.send(newEmbed1);
        } else {
            message.channel.send("You don't have the permissions!");
            setTimeout(function() {
                message.channel.bulkDelete(2).then(() => {}, 5000);

            });

        }

    }
}