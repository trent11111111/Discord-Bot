module.exports = {
    name: 'args-info',
    description: "Info about the arguments",
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You have not input any arguments, ${message.auther}!`);
        } else if (args[0] === `foo`) {
            return message.channel.send('bar');
        }
        message.channel.send(`Arguments: ${args} \nArgumnets Length: ${args.length}`)
    },



};