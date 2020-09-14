const axios = require('axios');

const queryAnime = async (message,payload) => {
    try {
        return await         
        axios({
            method: 'GET',
            url: 'https://api.jikan.moe/v3/search/anime',
            params: { q: payload, limit: '1' }
        })
    } catch (error) {
        message.channel.send('Error with MAL Api try again.');
        console.error(error)
    }
}
  
const getAnime = async (message,payload) => {
    const anime = await queryAnime(message,payload)
    if(anime == undefined) return;

    const animeTitles = anime.data.results.map(function(a) {
        return '> ' + a.title + 
            '\naired: ' + a.start_date.slice(0,10) + ' - ' + a.end_date.slice(0,10) +
            '\nrated: ' + a.rated +
            '\nepisodes: ' + a.episodes +
            '\nscore: ' + a.score + 
            '\nmembers: ' + a.members +
            '\n' + a.url;
    });
    
    message.channel.send(animeTitles);
}
  

module.exports = {
    name: 'title',
    description: 'returns info about anime title',
    async execute (message, payload){
        getAnime(message,payload);
    }
}