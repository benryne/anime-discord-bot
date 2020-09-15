require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');


const client = new Discord.Client();

const prefix = 'a!';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('online');
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot ) return;


    const args = message.content.slice(prefix.length,message.content.length).split(' ');
    const command = args[0].toLowerCase();
    let payload;
    if(args.length > 1) {
        payload = args[1].toLowerCase();
        for(let i = 2; i < args.length; i++) {
            payload += ' ' + args[i].toLowerCase();
        }
    }

    if(command == 'anime') {
        client.commands.get('anime').execute(message,payload);
    } else if(command == 'manga') {
        client.commands.get('manga').execute(message,payload);
    } else if(command == 'season') {
        client.commands.get('season').execute(message,payload);
    } else if(command == 'user') {
        client.commands.get('user').execute(message,payload);
    } else if(command == 'schedule') {
        client.commands.get('schedule').execute(message,payload);
    } else if(command == 'help' ) {
        client.commands.get('help').execute(message,payload);
    } else {
        message.channel.send('Error: command - "' + command + '" is invalid');
    }
})

client.login(process.env.TOKEN);