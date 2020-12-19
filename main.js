const Discord = require('discord.js');

const client = new Discord.Client();
const ms = require("ms");
const command123 = require('./command')
const config = require('./config.json')
const guild = client.guilds.cache.get("YOUR_GUILD_ID");
const roles = "roles";

const fs = require('fs');
const { isFunction } = require('util');
const { execute } = require('./commands/join');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
};






client.once('ready', () => {
    console.log('Bestbot is online!');

})


console.log(client)


client.on('message', message => {
    let args = message.content.substring(config.prefix.length).split(" ");
    if (message.member.roles.cache.has(config.Perms1) || message.member.roles.cache.has(config.Perms2)) {
        switch (args[0]) {
            case 'mute':

                let person = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
                if (!person) return message.reply("I CANT FIND THE USER " + person)

                let mainrole = message.guild.roles.cache.find(role => role.name === "Member");
                let role = message.guild.roles.cache.find(role => role.name === "Mute");


                if (!role) return message.reply("Couldn't find the mute role.")


                let time = args[2];
                if (!time) {
                    return message.reply("You didnt specify a time!");
                }

                person.roles.remove(mainrole.id)
                person.roles.add(role.id);


                message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
                setTimeout(function() {
                    message.channel.bulkDelete(2).then(() => {}, 1500);
                })

                setTimeout(function() {


                    person.roles.add(mainrole.id)
                    person.roles.remove(role.id);
                    console.log(role.id)

                }, ms(time));



                break;

        }
    }
})

client.on('message', message => {
    let args = message.content.substring(config.prefix.length).split(" ");


    switch (args[0]) {
        case 'help':
            text = "Hi here is some help    1. ping    2. perm"

            message.author.send(text);
            break;
    }
    switch (args[0]) {
        case 'test':
            const newEmbed = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setTitle('Rules')
                .setURL('https://youtube.com')
                .setDescription('this is a embed')
                .addFields({ name: 'Rule 1', value: 'Be nice' }, { name: 'Rule 2', value: 'Hello' }, { name: 'Rule 3', value: 'Hi' })
                .setFooter('Make sure to say hi in chat');

            message.author.send(newEmbed);
            break;
    }
})



client.on('message', message => {

    let args = message.content.substring(config.prefix.length).split(" ");



    switch (args[0]) {

        case 'join':
            if (message.member.roles.cache.has("784946981914411030") || message.member.roles.cache.has("785102303295438849")) {
                const newEmbed = new Discord.MessageEmbed()
                    .setColor('0000ff00')
                    .setTitle('Hello Holy Cow Inc asking for anyone to invite people to join the discord server that play CSGO')
                    .setURL('https://steamcommunity.com/groups/holycowgang')
                    .addFields({ name: 'Hello Holy Cow Inc ', value: 'Asking for anyone to invite people to join the discord server that play CSGO' }, { name: 'Also join the steam group', value: 'https://steamcommunity.com/groups/holycowgang' })
                    .setImage('https://lh3.googleusercontent.com/proxy/8cKbkyChjAtszb_5nVrDJ9oUg4QPvNrJlUCtFxHQKWKPjQevQlKk672jdhCXgtGmUAWLCSqbN6MbbOfQJAromZpkCxjvV4dirG_lGUHZ2c_bTxzODg4XsxhGFgc')

                message.author.send(newEmbed);
                break;
            }
    }
})
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
        command.execute(message, args, Discord);
    } catch (error) {
        console.error(error);
        message.reply('Ther was a issue executing that command!');
    }



});




command123(client, 'status', (message) => {
    if (message.member.roles.cache.has(config.Perms1) || message.member.roles.cache.has(config.Perms2)) {


        const content = message.content.replace('-status ', '')
            // "!status hello world" -> "hello world"

        client.user.setPresence({

            activity: {
                name: content,

                type: 0,
            }
        })

    }
})


client.on('message', message => {
    if (message.member.roles.cache.has(config.Perms1) || message.member.roles.cache.has(config.Perms2)) {
        // Ignore messages that aren't from a guild
        if (!message.guild) return;

        // If the message content starts with "!kick"
        if (message.content.startsWith('-kick')) {
            // Assuming we mention someone in the message, this will return the user
            // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
            const user = message.mentions.users.first();
            // If we have a user mentioned
            if (user) {
                // Now we get the member from the user
                const member = message.guild.member(user);
                // If the member is in the guild
                if (member) {
                    /**
                     * Kick the member
                     * Make sure you run this on a member, not a user!
                     * There are big differences between a user and a member
                     */
                    member
                        .kick('Optional reason that will display in the audit logs')
                        .then(() => {
                            // We let the message author know we were able to kick the person
                            message.reply(`Successfully kicked ${user.tag}`);
                        })
                        .catch(err => {
                            // An error happened
                            // This is generally due to the bot not being able to kick the member,
                            // either due to missing permissions or role hierarchy
                            message.reply('I was unable to kick the member');
                            // Log the error
                            console.error(err);
                        });
                } else {
                    // The mentioned user isn't in this guild
                    message.reply("That user isn't in this guild!");
                }
                // Otherwise, if no user was mentioned
            } else {
                message.reply("You didn't mention the user to kick!");
            }
        }
    }
});







client.login(config.token);