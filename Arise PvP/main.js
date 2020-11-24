const config = require('./config.json');
const prefix = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const jsonfile = require('jsonfile');

var stats = {};
if (fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json');
}

client.on('ready', async() => {
    console.log(`Arise PvP bot is now online, Prefix: ${config.prefix}`);
    client.user.setActivity(`Arise PvP`, {type: 'WATCHING'}) 
});

client.on('message', async(message) => {
    if(message.author.bot) return;
    if(!message.guild) return;            
    
    var PREFIX = config.prefix;
    if(!message.content.toLowerCase().startsWith(PREFIX)) return;

    var args = message.content.split(' ');
    var cmd = args.shift().slice(PREFIX.length).toLowerCase();

    try {
        var file = require(`./Commands/${cmd}.js`);
        file.run(client, message, args);
    } catch(err) {
        console.warn(err);
    }

});
 
// Swear filter below this and warning system.
client.on('message', (message) => {
    if (message.author.id == client.user.id)
         return;

    if (message.author.id == client.user.id)
         return;


    if(message.guild.id in stats === false) {
        stats[message.guild.id] = {}; 
     }
  
   const guildStats = stats[message.guild.id];
  
   if(message.author.id in guildStats === false) {
      guildStats[message.author.id] = {
          warns:  0
      }; 
   }
   const userStats = guildStats[message.author.id];


  
    jsonfile.writeFileSync('stats.json', stats);

    const Swears = ["fuck", "shit", "bitch", "ass", "nigger", "nigga", "niggers", "niggas", "fag", "fags", "faggots", "fucks", "fucking", "fucktard", "retard", "downy", "speds", "cunt", "bitches", "bitche", "fuckers", "shitters", "shits", "gay"]
      const help2 = Swears.filter(word => message.content.toLowerCase().includes(word));
    


          let messageArray = message.content.split(" ");
          let args = messageArray.slice(1);
          var member2 = message.guild.member(message.author || message.guild.members.cache.get(args[0]));
          var role = message.guild.roles.cache.find(role => role.name === "Muted");
          if (!role) return message.reply("Couldn't find the 'muted' role.")
           if (userStats.warns >= 4) {
           member2.roles.add(role.id)
           const muted = new Discord.MessageEmbed()
           .setColor('RED')
           .setTitle(`${message.author.username} has now been muted.`)
           .setTimestamp()
           .setFooter('Developed by FallenAlexS14#0001')
           userStats.warns = (userStats.warns - 5)
           message.delete(message.author)
           message.channel.send(muted)
           setTimeout(() => {
             member2.roles.remove(role.id)
             const MuteEmbed2 = new Discord.MessageEmbed()
             .setColor('GREEN')
             .setTitle(`${message.author.username} has now been unmuted.`)
             .setTimestamp()
             .setFooter('Developed by FallenAlexS14#0001')
             message.channel.send(MuteEmbed2)
           }, 600000);
          } else if (help2.length > 0) { 
            if (message.member.hasPermission("ADMIN", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_MESSAGES")) {
              message.author.send('I won\'t mute you cause your staff but try not to swear please!')
            } else {
            userStats.warns = (userStats.warns + 1)
            message.delete(message.author)
            const swearembed = new Discord.MessageEmbed()
            .setColor('ORANGE')
            .setTitle(`Please do not swear ${message.author.tag}, or you will be **muted**!`)
             message.channel.send(swearembed)
             console.log(message.author.username + ' now has ' + userStats.warns + ' warns');
            }
          }
          if (message.content.toLowerCase().startsWith('!warn')) {
          var warneduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
          var logs = message.guild.channels.cache.find(channel => channel.name === 'logs')
          var reason = args.slice(1).join(' ');
          if (!message.member.hasPermission('ADMIN', 'MANAGE_MESSAGES')) return message.reply('You do not have permissions to use this command!');
          if (!warneduser) return message.reply('Please specify a member to warn!');
          if (!reason) return message.reply('Please specify a reason for this warn!');
          if (!logs) return message.reply(`Please create a channel called "#logs" to log the mutes!`);
          const embed = new Discord.MessageEmbed()
              .setColor('#00d0ff')
              .addField('Warned Member', `${warneduser.user.username} with an ID: ${warneduser.user.id}`)
              .addField('Warned By', `${message.author.username} with an ID: ${message.author.id}`)
              .addField('Warned On', message.createdAt)
              .addField('Warned In', message.channel)
              .addField('Warned Reason', reason)
              .setTimestamp()
              .setFooter('Developed by FallenAlexS14#0001');
      
          message.channel.send(`${warneduser.user.username} was muted by ${message.author}, with a reason of ${reason}`);
          logs.send(embed);
          console.log(`${warneduser.user.username} was muted by ${message.author}, with a reason of ${reason}`)
          warneduser.send(embed)
          }
});


client.login(config.TOKENBOT)

// Developed by FallenAlexS14#0001