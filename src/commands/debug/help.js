const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "help",
    category: "debug",
    description: "Returns all commands",
    run: async(client, message, args) => {
        const array = [];
        const commands = client.commands.forEach(cmd => {
            array.push(cmd.name)
        })

        const embed = new MessageEmbed()
        .setTitle("Commands")
        .setDescription(`Commands: \`${array.join(', ')}\``)
        .setColor("GREEN");
        message.channel.send({embed: embed})
        
    }

}