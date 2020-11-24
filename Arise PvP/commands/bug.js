const Discord = require('discord.js');
module.exports.run = async (client, message, args, reaction, user ) => {
    var bugreportinformation = args.slice(0).join(' ');
    var viewchannel = message.guild.channels.cache.find(channel => channel.name === `bug-reports`)
    var logchannel = message.guild.channels.cache.find(channel => channel.name === `staff-logs`)
    if (!bugreportinformation) return message.reply('Please provide something to say inside of the **Bug Report**!').then(message => message.delete(10000));
    const Bugembed = new Discord.MessageEmbed()
    .setColor(`DARK_RED`)
    .setTitle(`Bug Report by ${message.author.tag}`)
    .setDescription(`${bugreportinformation}`)
    .setTimestamp()
    .setFooter('Developed by FallenAlexS14#0001')
    viewchannel.send(Bugembed).then(sentEmbed1 => {
    logchannel.send(Bugembed).then(sentEmbed => {
        sentEmbed.react("✅");
        const filter = (reaction, user) => {
          return (
            ["✅"].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };
        const Bugembed2 = new Discord.MessageEmbed()
        .setColor(`DARK_RED`)
        .setTitle(`Bug Report by ${message.author.tag}`)
        .setDescription(`**This bug has been resolved** | ${bugreportinformation}`)
        .setTimestamp()
        .setFooter('Developed by FallenAlexS14#0001')
        sentEmbed
          .awaitReactions(filter, { max: 1, time: 999999999, errors: ["time"] })
          .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === "✅") {
                sentEmbed.edit(Bugembed2)
                sentEmbed1.edit(Bugembed2)
            }
        });
    });
})
}