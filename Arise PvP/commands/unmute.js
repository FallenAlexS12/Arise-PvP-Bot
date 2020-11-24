var Discord = require('discord.js');

exports.run = async(client, message, args) => {
    var muteduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    var logs = message.guild.channels.cache.find(channel => channel.name === 'logs')
    var role = message.guild.roles.cache.find(role => role.name === "Muted");
    var reason = args.slice(1).join(' ');
    if (!reason) reason = 'Unspecified';
    if (!muteduser) return message.reply('You didn\'t mention anyone to be unmuted!').then(message => message.delete(10000))
    muteduser.roles.remove(role)
    const embed = new Discord.MessageEmbed()
    .setColor('#df8020')
    .addField('Unmuted Member', `${muteduser.user.username} with an ID: ${muteduser.user.id}`)
    .addField('Unmuted By', `${message.author.username} with an ID: ${message.author.id}`)
    .addField('Unmuted Reason', reason)
    .setFooter('Developed by FallenAlexS14#0001');
    logs.send(embed)
    const embed2 = new Discord.MessageEmbed()
    .setColor('ORANGE')
    .setTitle(`${muteduser} unmuted`)
    .addField(`**Reason**: ${reason}`)
    .addField(`**Unmuted By**: ${message.author}`)
    .setTimestamp()
    .setFooter('Developed by FallenAlexS14#0001')
    message.channel.send(embed2).then(message => message.delete(10000))
    message.channel.send(`${muteduser} has now been unmuted.`).then(message => message.delete(10000))
    logs.send(embed)
};