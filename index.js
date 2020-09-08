require('dotenv').config();

console.log("TOKEN: " + process.env.TOKEN);

const Discord = require('discord.js');
const fs = require('fs');


const client = new Discord.Client();

const prefix = 'anime!';

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

    console.log(message.content + " " + message.content.length);

    const args = message.content.slice(prefix.length,message.content.length).split(' ');
    const command = args[0].toLowerCase();
    const payload = args[1].toLowerCase();

    console.log(command);
    console.log(payload);

    if(command == 'title') {
        client.commands.get('title').execute(message,payload);
    } else if(command == 'google') {
        message.channel.send('https://google.com');
    }
})

client.login(process.env.TOKEN);