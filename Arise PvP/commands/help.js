const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const HelpEmbed = new Discord.MessageEmbed()
    .setColor('#2096df')
    .setTitle('Help')
    .addFields(
        { name: 'Reaction Roles Commands', value: '`!reactionroles`' },
        { name: 'Moderation Commands', value: '`!moderation`' },
        { name: 'General Commands', value: '`!general`' },
    )
    .setTimestamp()
    .setFooter('Developed by FallenAlexS14#0001')
    message.channel.send(HelpEmbed)
}