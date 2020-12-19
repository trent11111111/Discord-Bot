const config = require('../config.json')
module.exports = {
    name: 'join',
    description: "join",
    async execute(message, args, Discord) {
        if (message.member.roles.cache.has(config.Perms1) || message.member.roles.cache.has(config.Perms2)) {
            message.channel.bulkDelete(1)
            const newEmbed2 = new Discord.MessageEmbed()
                .setColor('0000ff00')
                .setTitle('Hello Holy Cow Inc asking for anyone to invite people to join the discord server that play CSGO')
                .setURL('https://steamcommunity.com/groups/holycowgang')
                .addFields({ name: 'Hello Holy Cow Inc ', value: 'Asking for anyone to invite people to join the discord server that play CSGO' }, { name: 'Also join the steam group', value: 'https://steamcommunity.com/groups/holycowgang' })
                .setImage('https://lh3.googleusercontent.com/proxy/8cKbkyChjAtszb_5nVrDJ9oUg4QPvNrJlUCtFxHQKWKPjQevQlKk672jdhCXgtGmUAWLCSqbN6MbbOfQJAromZpkCxjvV4dirG_lGUHZ2c_bTxzODg4XsxhGFgc')
            message.channel.send(newEmbed2);
        } else {
            message.channel.send("You don't have the permissions!");
            setTimeout(function() {
                message.channel.bulkDelete(2).then(() => {}, 5000);

            });

        }

    }
}