const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const HelpEmbed = new Discord.MessageEmbed()
    .setColor('#21981b')
    .setTitle('General Help')
    .addFields(
        { name: '**SayEm Syntax**:', value: '`!sayem (Channel) (EmbedColor) (Title Word) (Title Word) (What you want it to say)`' },
        { name: '**UserInfo Syntax**:', value: '`!userinfo @user or !ui @user`'},
        { name: '**Bug Syntax**:', value: '`!bug (Bug description)`' },
        { name: '**About Syntax**:', value: '`!about`' },
    )
    .setTimestamp()
    .setFooter('Developed by FallenAlexS14#0001')
    message.channel.send(HelpEmbed)
}