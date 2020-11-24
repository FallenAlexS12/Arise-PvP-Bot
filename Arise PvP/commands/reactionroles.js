const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const HelpEmbed = new Discord.MessageEmbed()
    .setColor('#db1457')
    .setTitle('Reaction Roles Help')
    .setDescription('To use **Reaction Roles** simply react to the emoji corresponding with the role that you want. If you want to unreact to role(s) simply react to the :x: emoji! Once reacting the roles will automatically be given to you.')
    .setTimestamp()
    .setFooter('Developed by FallenAlexS14#0001')
    message.channel.send(HelpEmbed)
}