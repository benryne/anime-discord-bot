const axios = require('axios');

const queryAnimeSchedule = async (message) => {
    try {
        return await         
        axios({
            method: 'GET',
            url: `https://api.jikan.moe/v3/schedule`
        })
    } catch (error) {
        console.error(error)
        message.channel.send('Error with MAL Api try again.');
        return;
    }
}

const queryAnimeScheduleWithDay = async (message,payload) => {
    try {
        return await         
        axios({
            method: 'GET',
            url: `https://api.jikan.moe/v3/schedule/${payload}`
        })
    } catch (error) {
        console.error(error)
        message.channel.send('Error with MAL Api try again.');
        return;
    }
}
  
const getAnimeScheduleWithDay = async (message,payload) => {
    const anime = await queryAnimeScheduleWithDay(message,payload);
    if(anime == undefined) return;
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
    message.channel.send('> ' + capitalizedDay + ' schedule:\n' + formattedAnimeSchedule.toString().replace(/,/g, ""));
}

const getAnimeSchedule = async (message) => {
    const anime = await queryAnimeSchedule(message);
    if(anime == undefined) return;
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
    const formattedAnime = ['> Monday: \n' + formattedAnimeMonday.toString().replace(/,/g, ""),
        '> Tuesday: \n' + formattedAnimeTuesday.toString().replace(/,/g, ""),
        '> Wednesday: \n' + formattedAnimeWednesday.toString().replace(/,/g, ""),
        '> Thursday: \n' + formattedAnimeThursday.toString().replace(/,/g, ""),
        '> Friday: \n' + formattedAnimeFriday.toString().replace(/,/g, ""),
        '> Saturday: \n' + formattedAnimeSaturday.toString().replace(/,/g, ""),
        '> Sunday: \n' + formattedAnimeSunday.toString().replace(/,/g, "")];

    for(let x = 0; x < formattedAnime.length; x++) {
        message.channel.send(formattedAnime[x]);
    }
}

const checkValidDay = (payload) => {
    const lowerCase = payload.toLowerCase();
    if(lowerCase == 'sunday' || lowerCase == 'monday' || lowerCase == 'tuesday' || lowerCase == 'wednesday' ||
        lowerCase == 'thursday' || lowerCase == 'friday' || lowerCase == 'saturday') {
        return true;
    }
    return false;
}

module.exports = {
    name: 'schedule',
    description: 'returns info about anime scheduled',
    async execute (message, payload){
        if(payload == undefined) {
            await getAnimeSchedule(message);
        } else {
            if(checkValidDay(payload)) {
                await getAnimeScheduleWithDay(message,payload);
            } else {
                message.channel.send('Error: please provide a correct day of the week\n' +
                '> Schedule Commands: \n' +
                'a!schedule \n' + 
                'a!schedule [day of the week]\n\n');
                return;
            }
        }
    }
}