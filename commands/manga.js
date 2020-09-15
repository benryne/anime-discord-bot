const axios = require('axios');

const queryManga = async (message,payload) => {
    try {
        return await         
        axios({
            method: 'GET',
            url: 'https://api.jikan.moe/v3/search/manga',
            params: { q: payload, limit: '1' }
        })
    } catch (error) {
        message.channel.send('Error with MAL Api try again.');
        console.error(error)
    }
}
  
const getManga = async (message,payload) => {
    const manga = await queryManga(message,payload)
    if(manga == undefined) return;

    const mangaTitle = manga.data.results.map(function(m) {
        return '> ' + m.title + 
            '\nstarted: ' + m.start_date.slice(0,10) +
            '\nscore: ' + m.score + 
            '\nmembers: ' + m.members +
            '\nongoing: ' + m.publishing + 
            '\n' + m.url;
    });

    message.channel.send(mangaTitle);
}
  

module.exports = {
    name: 'manga',
    description: 'returns info about manga title',
    async execute (message, payload){
        if(payload === undefined) 
            message.channel.send('Error: Please Specify Title\n > Title Commands: \na!manga [title]\n');
        getManga(message,payload);
    }
}