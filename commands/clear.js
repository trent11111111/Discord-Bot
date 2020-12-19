const config = require('../config.json')
module.exports = {
    name: 'clear',
    description: "Clear messages!",
    async execute(message, args) {

        if (message.member.roles.cache.has(config.Perms1) || message.member.roles.cache.has(config.Perms2)) {


            if (!args[0]) return message.reply("Please enter the amount of messagse that you want to clear!");
            if (isNaN(args[0])) return message.reply("Please enter a real number!");;
            if (args[0] > 100) return message.reply('You can`t delete more than 100 messages!');
            if (args[0] < 1) return message.reply('You must delete at least 1 message!');

            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages);

            });

        } else {
            message.channel.send("You don't have the permissions!");
            setTimeout(function() {
                message.channel.bulkDelete(2).then(() => {}, 5000);
            });

        }
    }
}