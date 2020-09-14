const axios = require('axios');

const queryAnimeSeason = async (message,payload) => {
    const date = payload.split(' ')
    try {
        return await         
        axios({
            method: 'GET',
            url: `https://api.jikan.moe/v3/season/${date[1]}/${date[0]}`
        })
    } catch (error) {
        console.error(error)
        message.channel.send('Error with MAL Api try again.');
    }
}
  
const getAnimeSeason = async (message,payload) => {
    const anime = await queryAnimeSeason(message,payload);
    if(anime == undefined) return;
    const animeTitles = anime.data.anime.map(function(a) {
        // remove entrires that are not tv or are continuing 
        if(a.continuing == false && a.type == 'TV') {
            let ret = '> ' + a.title + '\nGenres: ';
            for(let x = 0; x < a.genres.length-1; x++) {
                ret += a.genres[x].name + ", ";
            }
            ret += a.genres[a.genres.length-1].name;
            ret += '\nEpisodes: ' + a.episodes + '\tMembers: ' + a.members + '\tScore: ' + a.score + '\n';
            return ret;
        }
    }); 
    const filteredAnimeTitles = animeTitles.filter(function (formattedAnime) {
        return formattedAnime != undefined;
    })
    const filteredTenAnime = filteredAnimeTitles.slice(0,10);
    message.channel.send(filteredTenAnime);
}
  
const checkSeasonInput = (message,payload) => {
    const season = payload.split(' ');
    console.log(season);
    if(season.length != 2) {
        message.channel.send('Error: command must contain season and year \n' +  
        '> Season Commands: \n' +
        'a!season [season] [year]\n\n');
        return false;
    }
    if(season[0] != 'fall' && season[0] != 'winter' && season[0] != 'spring' && season[0] != 'summer') {
        message.channel.send('Error: season name must be winter, spring, summer, or fall\n' +
        '> Season Commands: \n' +
        'a!season [season] [year]\n\n');
        return false;
    }
    if(parseInt(season[1],10) < 1961 || parseInt(season[1],10) > 2022 ) {
        message.channel.send('Error: incorrect year\n' +
        '> Season Commands: \n' +
        'a!season [season] [year]\n\n');
        return false;
    }
    return true;
}

module.exports = {
    name: 'season',
    description: 'returns info about anime season',
    async execute (message, payload){
        if(checkSeasonInput(message,payload)) {
            await getAnimeSeason(message,payload);
        }
    }
}