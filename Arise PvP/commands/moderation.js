const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const HelpEmbed = new Discord.MessageEmbed()
    .setColor('#f82112')
    .setTitle('Moderation Help')
    .addFields(
        { name: '**Ban Syntax**', value: '`!ban @user (Time) (Reason)`' },
        { name: '**Kick Syntax**', value: '`!kick @user (Time) (Reason)`' },
        { name: '**Mute Syntax**', value: '`!mute @user (Time) (Reason)`' },
        { name: '**Purge Syntax**', value: '`!purge (Amount of messages)`' },
        { name: '**Unban Syntax**', value: '`!unban @user (Reason)`' },
        { name: '**Unmute Syntax**', value: '`!unmute @user (Reason)`' },
    )
    .setTimestamp()
    .setFooter('Developed by FallenAlexS14#0001')
    message.channel.send(HelpEmbed)
}