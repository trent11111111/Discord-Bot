const Commando = require('discord.js-commando')
const config = require('../config.json')

module.exports = {

    name: 'slow',
    description: 'Changes the slowmode duration for this channel',

    async execute(message, args) {
        const { channel } = message
        if (message.member.roles.cache.has(config.Perms1) || message.member.roles.cache.has(config.Perms2)) {

            if (args.length < 1) {
                message.reply('Please provide a duration and a reason')
                return
            }

            let duration = args.shift().toLowerCase()
            if (duration === 'off') {
                duration = 0
            }

            if (isNaN(duration)) {
                message.reply(
                    'Please provide either a number of seconds or the word "off"'
                )
                return
            }

            //['testing','hello','world']
            //.join(' ')
            //testing hello world

            channel.setRateLimitPerUser(duration, args.join(' '))
            message.reply(`The slowmode for this channel has been set to ${duration} Seconds`)
        } else {
            message.channel.send("You don't have the permissions!");
            setTimeout(function() {
                message.channel.bulkDelete(2).then(() => {}, 5000);
            });

        }

    }
}