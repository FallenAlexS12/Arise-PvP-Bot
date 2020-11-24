const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    var AmountToDelete = args[0];
    if (!AmountToDelete) return message.reply('You need to give a amount of messages to delete in this channel!').then(message => message.delete(10000))
    message.channel.bulkDelete(AmountToDelete)
    message.channel.send(`Successfully purged ${AmountToDelete} messages in ${message.channel}`).then(message => message.delete(5000))
    console.log(`Successfully purged ${AmountToDelete} messages in ${message.channel}`)
};