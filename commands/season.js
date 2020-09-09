const axios = require('axios');

const queryAnimeSeason = async (payload) => {
    const date = payload.split(' ')
    try {
        return await         
        axios({
            method: 'GET',
            url: `https://api.jikan.moe/v3/season/${date[1]}/${date[0]}`
        })
    } catch (error) {
        console.error(error)
    }
}
  
const getAnimeSeason = async (payload) => {
    const anime = await queryAnimeSeason(payload);
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
    return filteredAnimeTitles;
}
  

module.exports = {
    name: 'season',
    description: 'returns info about anime season',
    async execute (message, payload){
        const anime = await getAnimeSeason(payload);
        const firstTenAnime = anime.slice(0,10);
        message.channel.send(firstTenAnime);
    }
}