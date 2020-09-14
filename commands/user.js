const axios = require('axios');

const queryAnimeUser = async (message,payload) => {
    const user = payload.split(' ');
    if(user.length == 1) {
        try {
            return await         
            axios({
                method: 'GET',
                url: `https://api.jikan.moe/v3/user/${user[0]}/animelist`
            })
        } catch (error) {
            message.channel.send('Problem with api try agian');
            console.error(error)
            return;
        }
    }
    else {
        try {
            return await         
            axios({
                method: 'GET',
                url: `https://api.jikan.moe/v3/user/${user[0]}/animelist/${user[1]}`
            })
        } catch (error) {
            message.channel.send('Problem with api try agian');
            console.error(error)
            return;
        }
    }
}


const testInput = async (message,payload) => {
    const user = payload.split(' ');
    if(user.length > 2) {
        message.channel.send('Error: Too many arguments\n > User Commands: \n' +
        'a!user [mal username]\n' +
        'a!user [mal username] [watching,completed,on hold,dropped,plan to watch]\n\n');
        return false;
    }
    if(user.length == 2) {
        let a = user[1].toLowerCase();
        if(a != 'watching' && a != 'completed' && a != 'on hold' && a != 'dropped' && a != 'ptw' && a != "plan to watch") {
            message.channel.send('Error: Second argument was not correct\n > User Commands: \n' +
            'a!user [mal username]\n' +
            'a!user [mal username] [watching,completed,on hold,dropped,plan to watch]\n\n');
            return false;
        }
    }
    if(await testAnimeUserExists(message,payload) == undefined) {
        message.channel.send('Error: Could not find user');
        return false;
    }
    return true;
}

const testAnimeUserExists = async (message,payload) => {
    const user = payload.split(' ');
    try {
        return await         
        axios({
            method: 'GET',
            url: `https://api.jikan.moe/v3/user/${user[0]}/profile`
        })
    } catch (error) {
        return;
    }
}
  
const getAnimeUser = async (message,payload) => {

    if(await testInput(message,payload)) {
        const user = await queryAnimeUser(payload);
        formatAnimeTitlesAndSendMessage(message,user);
    }
}

const formatAnimeTitlesAndSendMessage = (message,user) => {
    if(user == undefined) return;
    const userAnimeTitles = user.data.anime.map(function(a) {
        if(a.watching_status == 1) {
            return '> ' + a.title + '\nWatching' + '\tScore: ' + a.score + '\tEpisodes: ' + a.watched_episodes +'/' + a.total_episodes + '\n';
        }
        if(a.watching_status == 2) {
            return '> ' + a.title + '\nCompleted' + '\tScore: ' + a.score + '\tEpisodes: ' +  a.total_episodes + '\n' ;
        }
        if(a.watching_status == 3) {
            return '> ' + a.title + '\nOn Hold' + '\tScore: ' + a.score + '\tEpisodes: ' + a.watched_episodes + '/' + a.total_episodes + '\n';
        }
        if(a.watching_status == 4) {
            return '> ' + a.title +'\nDropped' + '\tScore: ' + a.score + '\tEpisodes: ' + a.watched_episodes + '/' + a.total_episodes + '\n';
        }
        else {
            return '> ' + a.title + ' Plan To Watch' + '\n' ;
        }
    }); 
    for(let x = 0; x < userAnimeTitles.length; x+=25) {
        message.channel.send(userAnimeTitles.slice(x,x+25))
    }
}
  
module.exports = {
    name: 'user',
    description: 'returns info about mal username',
    async execute (message, payload){
        getAnimeUser(message,payload);
    }
}