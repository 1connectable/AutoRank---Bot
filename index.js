const Discord = require('discord.js');

const intents = new Discord.IntentsBitField(3276799)

const client = new Discord.Client({intents})

const config = require('./config.json')

client.once('ready', () => {

    console.log(`${client.user.tag} est en ligne`);

});

client.on('messageCreate', (message) => {
    
    if (message.mentions.has(client.user)) {
        
      if (message.member.displayName && message.member.displayName.includes(config.tag)) {

            const role = message.guild.roles.cache.get(config.role);

            if (role) {

                message.member.roles.add(role)

                    .then(() => {

                        message.channel.send(`<@${message.author.id}>, vous avez maintenant le rôle ${role.name}!`);

                    })

                    .catch((error) => {

                        console.log(`Erreur : ${error}`);

                    });

            } else {

                message.channel.send("Erreur.");

            }

        } else {

            message.channel.send(`<@${message.author.id}>, vous n'avez pas le tag '${config.tag}' dans votre pseudo. Veuillez le mettre.`);

        }

    }

});

client.login(config.token);