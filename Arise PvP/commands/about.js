const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    const AboutEmbed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('About Arise PvP Bot')
    .setDescription('I was created by **FallenAlexS14#0001** and I am developed in Discord.js!')
    .setTimestamp()
    .setFooter('Developed by FallenAlexS14#0001')
    message.channel.send(AboutEmbed)
};