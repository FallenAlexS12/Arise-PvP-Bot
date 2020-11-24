var Discord = require('discord.js');

exports.run = async(client, message, args) => {
    var banneduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    var logs = message.guild.channels.cache.find(channel => channel.name === 'logs')
    var reason = args.slice(1).join(' ');
    if (!reason) reason = 'Unspecified';
    message.guild.unban(banneduser, {reason: reason}).catch(err => {
        if(err) return message.channel.send('Something went wrong when trying to unban that user!')
        console.log(err)
    })
    const embed = new Discord.MessageEmbed()
    .setColor('#df8020')
    .addField('Unbanned Member', `${banneduser.user.username} with an ID: ${banneduser.user.id}`)
    .addField('Unbanned By', `${message.author.username} with an ID: ${message.author.id}`)
    .addField('Unbanned Reason', reason)
    .setFooter('Developed by FallenAlexS14#0001');
    logs.send(embed)
    const embed2 = new Discord.MessageEmbed()
    .setColor('ORANGE')
    .setTitle(`${banneduser} unbanned`)
    .addField(`**Reason**: ${reason}`)
    .addField(`**Unbanned By**: ${message.author}`)
    .setTimestamp()
    .setFooter('Developed by FallenAlexS14#0001')
    message.channel.send(`${banneduser} has now been unbanned.`).then(message => message.delete(10000));
    message.channel.send(embed2).then(message => message.delete(10000));
    logs.send(embed)
};