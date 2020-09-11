const axios = require('axios');

const queryAnimeSchedule = async () => {
    try {
        return await         
        axios({
            method: 'GET',
            url: `https://api.jikan.moe/v3/schedule`
        })
    } catch (error) {
        console.error(error)
    }
}

const queryAnimeScheduleWithDay = async (payload) => {
    try {
        return await         
        axios({
            method: 'GET',
            url: `https://api.jikan.moe/v3/schedule/${payload}`
        })
    } catch (error) {
        console.error(error)
    }
}
  
const getAnimeScheduleWithDay = async (payload) => {
    const anime = await queryAnimeScheduleWithDay(payload);
    let formattedAnimeSchedule = [];
    if(payload == 'monday') {
        formattedAnimeSchedule = anime.data.monday.map(function(a) {
            return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
        }); 
    } else if(payload == 'tuesday') {
        formattedAnimeSchedule = anime.data.tuesday.map(function(a) {
            return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
        });  
    } else if(payload == 'wednesday') {
        formattedAnimeSchedule = anime.data.wednesday.map(function(a) {
            return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
        });  
    } else if(payload == 'thursday') {
        formattedAnimeSchedule = anime.data.thursday.map(function(a) {
            return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
        });  
    } else if(payload == 'friday') {
        formattedAnimeSchedule = anime.data.friday.map(function(a) {
            return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
        });  
    } else if(payload == 'saturday') {
        formattedAnimeSchedule = anime.data.saturday.map(function(a) {
            return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
        });  
    } else {
        formattedAnimeSchedule = anime.data.sunday.map(function(a) {
            return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
        });  
    }

    let capitalizedDay = payload.charAt(0).toUpperCase() + payload.slice(1);
    return '> ' + capitalizedDay + ' schedule:\n' + formattedAnimeSchedule.toString().replace(/,/g, "");
}

const getAnimeSchedule = async () => {
    const anime = await queryAnimeSchedule();
    const formattedAnimeMonday = anime.data.monday.map(function(a) {
        return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
    }); 
    const formattedAnimeTuesday = anime.data.tuesday.map(function(a) {
        return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
    }); 
    const formattedAnimeWednesday = anime.data.wednesday.map(function(a) {
        return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
    });
    const formattedAnimeThursday = anime.data.thursday.map(function(a) {
        return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
    });  
    const formattedAnimeFriday = anime.data.friday.map(function(a) {
        return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
    }); 
    const formattedAnimeSaturday = anime.data.saturday.map(function(a) {
        return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
    }); 
    const formattedAnimeSunday = anime.data.sunday.map(function(a) {
        return a.title + '\t' + a.airing_start.slice(11,16) + ' UTC' + '\n';
    }); 
    const ret = ['> Monday: \n' + formattedAnimeMonday.toString().replace(/,/g, ""),
        '> Tuesday: \n' + formattedAnimeTuesday.toString().replace(/,/g, ""),
        '> Wednesday: \n' + formattedAnimeWednesday.toString().replace(/,/g, ""),
        '> Thursday: \n' + formattedAnimeThursday.toString().replace(/,/g, ""),
        '> Friday: \n' + formattedAnimeFriday.toString().replace(/,/g, ""),
        '> Saturday: \n' + formattedAnimeSaturday.toString().replace(/,/g, ""),
        '> Sunday: \n' + formattedAnimeSunday.toString().replace(/,/g, "")];
    return ret;
}

module.exports = {
    name: 'schedule',
    description: 'returns info about anime scheduled',
    async execute (message, payload){
        let anime = '';
        if(payload == undefined) {
            anime = await getAnimeSchedule();
            for(let x = 0; x < anime.length; x++) {
                message.channel.send(anime[x]);
            }
        } else {
            anime = await getAnimeScheduleWithDay(payload);
            message.channel.send(anime);
        }
    }
}