const Discord = require("discord.js");
var ms = require('ms');

module.exports.run = async (client, message, args) => {

    var banneduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    var rawTime = args[1];
    var time = ms(rawTime);
    var reason = args.slice(2).join(' ');
    if (!reason) reason = 'Unspecified';
    var logs = message.guild.channels.cache.find(channel => channel.name === 'logs')
    if (!message.member.hasPermission('BAN_MEMBERS', 'ADMIN')) return message.reply('You do not have permissions to use this command!').then(message => message.delete(10000));
    if (!time) return msg.reply('You didn\'t specify a time!').then(message => message.delete(10000));
    if (!banneduser) return message.reply('Please specify a member to ban!').then(message => message.delete(10000));
    if (!logs) return message.reply(`Please create a channel called "#logs" to log the bans!`).then(message => message.delete(10000));

    const embed = new Discord.MessageEmbed()
        .setColor('#df2920')
        .addField('Banned Member', `${banneduser.user.username} with an ID: ${banneduser.user.id}`)
        .addField('Banned By', `${message.author.username} with an ID: ${message.author.id}`)
        .addField('Banned On', message.createdAt)
        .addField('Banned for ', rawTime)
        .addField('Banned In', message.channel )
        .addField('Banned Reason', reason)
        .setTimestamp()
        .setFooter('Developed by FallenAlexS14#0001')
    message.channel.send(`${banneduser.user.username} was banned by ${message.author} for ${reason}`);
    banneduser.send(embed)
    banneduser.ban(reason);
    logs.send(embed);
    console.log(banneduser + " has been banned for: " + reason)
    setTimeout(async() => {
        message.guild.unban(banneduser, {reason: reason}).catch(err => {
            if(err) return message.channel.send('Something went wrong when trying to unban that person after their ban expired!')
        })
        console.log('User unbanned after ' + time + ' of being banned!')
    }, time);
};
