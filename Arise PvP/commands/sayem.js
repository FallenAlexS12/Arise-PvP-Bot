const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    var sayemchannel = args[0];
    var Hexcolorforembed = args[1];
    var TitlePartOneForEmbed = args[2];
    var TitlePartTwoForEmbed = args[3];
    var sendchannel = message.guild.channels.cache.find(channel => channel.name === `${sayemchannel}`)
    var sayeminformation = args.slice(4).join(' ');
    if (!TitlePartTwoForEmbed) message.reply('Please provide a two word title!').then(message => message.delete(10000));
    if (!sayemchannel) return message.reply('Please provide a channel to send this SayEm to!').then(message => message.delete(10000));
    if (!sayeminformation) return message.reply('Please provide something to say inside of the embed!').then(message => message.delete(10000));
    if (!Hexcolorforembed) return message.reply('You sent a invalid color or didn\'t send a color at all').then(message => message.delete(10000));
    const Sayembed = new Discord.MessageEmbed()
    .setColor(`${Hexcolorforembed}`)
    .setTitle(`${TitlePartOneForEmbed} ${TitlePartTwoForEmbed}`)
    .setDescription(`${sayeminformation}`)
    .setTimestamp()
    .setFooter('Developed by FallenAlexS14#0001')
    sendchannel.send(Sayembed)


}