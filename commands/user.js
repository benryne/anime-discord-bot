const axios = require('axios');

const queryAnimeUser = async (payload) => {
    const user = payload.split(' ');
    if(user.length == 1) {
        try {
            return await         
            axios({
                method: 'GET',
                url: `https://api.jikan.moe/v3/user/${user[0]}/animelist`
            })
        } catch (error) {
            console.error(error)
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
            console.error(error)
        }
    }
}
  
const getAnimeUser = async (payload) => {
    const user = await queryAnimeUser(payload);
    console.log(user.data.anime);
    const userAnimeTitles = user.data.anime.map(function(a) {
        // remove entrires that are not tv or are continuing 
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
    console.log(userAnimeTitles);
    return userAnimeTitles;
}
  
module.exports = {
    name: 'user',
    description: 'returns info about mal username',
    async execute (message, payload){
        const user = await getAnimeUser(payload);
        for(let x = 0; x < user.length; x+=25) {
            message.channel.send(user.slice(x,x+25))
        }
    }
}