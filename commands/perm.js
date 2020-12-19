const config = require('../config.json')
module.exports = {
    name: 'perm',
    description: "this is a perm command!",
    execute(message, args) {

        if (message.member.roles.cache.has(config.Perms1)) {
            message.channel.send('HI');
        } else {
            message.channel.send("Hi i see you don't have that role");
            message.member.roles.add(config.Perms1).catch(console.error);
        }

    }
}