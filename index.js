require('dotenv').config();

console.log("TOKEN: " + process.env.TOKEN);

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

    console.log(payload);

    console.log(command);

    if(command == 'title') {
        if(payload === undefined) message.channel.send('invalid format - correct usage: anime!title [title]');
        else client.commands.get('title').execute(message,payload);
    } else if(command == 'season') {
        if(payload === undefined) message.channel.send('please specify season year');
        else client.commands.get('season').execute(message,payload);
    }
    else if(command == 'user') {
        client.commands.get('user').execute(message,payload);
    }
    else if(command == 'schedule') {
        client.commands.get('schedule').execute(message,payload);
    }
    else if(command == 'help' ) {
        client.commands.get('help').execute(message,payload);
    }
    else {
        message.channel.send('command: "' + command + '" is invalid');
    }
})

client.login(process.env.TOKEN);