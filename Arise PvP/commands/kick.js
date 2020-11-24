const Discord = require("discord.js");
var ms = require('ms');

module.exports.run = async (client, message, args) => {

    var kickeduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    var reason = args.slice(1).join(' ');
    var logs = message.guild.channels.cache.find(channel => channel.name === 'logs')
    if (!reason) reason = 'Unspecified';
    if (!kickeduser) return message.reply('Please specify a member to ban!').then(message => message.delete(10000));
    if (!logs) return message.reply(`Please create a channel called "#logs" to log the bans!`).then(message => message.delete(10000));
    if (!message.member.hasPermission('BAN_MEMBERS', 'ADMIN')) return message.reply('You do not have permissions to use this command!').then(message => message.delete(10000));
    const embed = new Discord.MessageEmbed()
        .setColor('#df8020')
        .addField('Kicked Member', `${kickeduser.user.username} with an ID: ${kickeduser.user.id}`)
        .addField('Kicked By', `${message.author.username} with an ID: ${message.author.id}`)
        .addField('Kick Time', message.createdAt)
        .addField('Kicked for ', rawTime)
        .addField('Kicked In', message.channel)
        .addField('Kicked Reason', reason)
        .setTimestamp()
        .setFooter('Developed by FallenAlexS14#0001');
kickeduser.send(embed)
    message.channel.send(`${kickeduser.user.username} was kicked by ${message.author} for ${reason}`).then(message => message.delete(10000));
    kickeduser.kick(reason);
    logs.send(embed);
    console.log(kickeduser + " has been kicked for: " + reason)
};