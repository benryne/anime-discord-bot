const axios = require('axios');

const queryAnime = async (payload) => {
    try {
        return await         
        axios({
            method: 'GET',
            url: 'https://api.jikan.moe/v3/search/anime',
            params: { q: payload, limit: '1' }
        })
    } catch (error) {
        console.error(error)
    }
}
  
const getAnime = async (payload) => {
    const anime = await queryAnime(payload)
    const animeTitles = anime.data.results.map(function(a) {
        return '> ' + a.title + 
            '\naired: ' + a.start_date.slice(0,10) + ' - ' + a.end_date.slice(0,10) +
            '\nrated: ' + a.rated +
            '\nepisodes: ' + a.episodes +
            '\nscore: ' + a.score + 
            '\nmembers: ' + a.members +
            '\n' + a.url;
    });
    
    return animeTitles;
}
  

module.exports = {
    name: 'title',
    description: 'returns info about anime title',
    async execute (message, payload){
        const t = await getAnime(payload);
        message.channel.send(t);
    }
}