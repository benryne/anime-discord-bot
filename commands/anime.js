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

    const animeTitle = anime.data.results.map(function(a) {
        return '> ' + a.title + 
            '\naired: ' + a.start_date.slice(0,10) + ' - ' + a.end_date.slice(0,10) +
            '\nrated: ' + a.rated +
            '\nepisodes: ' + a.episodes +
            '\nscore: ' + a.score + 
            '\nmembers: ' + a.members +
            '\n' + a.url;
    });
    
    message.channel.send(animeTitle);
}
  

module.exports = {
    name: 'anime',
    description: 'returns info about anime title',
    async execute (message, payload){
        if(payload === undefined) 
            message.channel.send('Error: Please Specify Title\n > Title Commands: \na!anime [title]\n');
        getAnime(message,payload);
    }
}