const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const client = new Client({
    disableEveryone: true
});
const config = require('../config.json');
client.config = config;

client.commands = new Collection();
client.aliases = new Collection();
//client.categories = fs.readdirSync('../src/commands/')
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.on('ready', () => {
    client.user.setActivity(config.bot.activity.game, {type: config.bot.activity.type.toUpperCase()});
    console.log('Bot is now ready!')
});


client.on('message', async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith("!")) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(1).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    const command = client.commands.get(cmd)
    if(!command) client.command.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args)
});




client.login(config.bot.token);



