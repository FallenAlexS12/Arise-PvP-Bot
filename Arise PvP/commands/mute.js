
const Discord = require("discord.js");
var ms = require('ms');

module.exports.run = async (client, message, args) => {

    var muteduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    var logs = message.guild.channels.cache.find(channel => channel.name === 'logs')
    var role = message.guild.roles.cache.find(role => role.name === "Muted");
    var rawTime = args[1];
    var time = ms(rawTime);
    var reason = args.slice(2).join(' ');
    if (!reason) reason = 'Unspecified';
    if (!message.member.hasPermission('ADMIN', 'MANAGE_MESSAGES')) return message.reply('You do not have permissions to use this command!').then(message => message.delete(10000));
    if (!time) return msg.reply('You didn\'t specify a time!').then(message => message.delete(10000));
    if (!muteduser) return message.reply('Please specify a member to mute!').then(message => message.delete(10000));
    if (!logs) return message.reply(`Please create a channel called "#logs" to log the mutes!`).then(message => message.delete(10000));
    const embed = new Discord.MessageEmbed()
        .setColor('#eef20d')
        .addField('Muted Member', `${muteduser.user.username} with an ID: ${muteduser.user.id}`)
        .addField('Muted By', `${message.author.username} with an ID: ${message.author.id}`)
        .addField('Muted On', message.createdAt)
        .addField('Muted for ', rawTime)
        .addField('Muted In', message.channel)
        .addField('Muted Reason', reason)
        .setTimestamp()
        .setFooter('Developed by FallenAlexS14#0001');

    message.channel.send(`${muteduser.user.username} was muted by ${message.author} for ${rawTime}, with a reason of ${reason}`).then(message => message.delete(10000));
    logs.send(embed);
    console.log(`${muteduser.user.username} was muted by ${message.author} for ${rawTime}, with a reason of ${reason}`)
    muteduser.send(embed)
    muteduser.roles.add(role);
    setTimeout(async() => {
        muteduser.roles.remove(role);
        console.log('User unmuted after ' + time + ' of being muted!')
    }, time);
};