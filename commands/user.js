const axios = require('axios');

const queryUser = async (message,payload) => {
    const user = payload.split(' ');
    if(user.length == 2) {
        try {
            return await         
            axios({
                method: 'GET',
                url: `https://api.jikan.moe/v3/user/${user[0]}/${user[1]}list`
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
                url: `https://api.jikan.moe/v3/user/${user[0]}/${user[1]}list/${user[2]}`
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
    if(user.length < 2) {
        message.channel.send('Error: Too few arguments\n > User Commands: \n' +
        'a!user [mal username] anime\n' +
        'a!user [mal username] manga\n' +
        'a!user [mal username] anime [watching,completed,onhold,dropped,ptw]\n\n' +
        'a!user [mal username] manga [reading,completed,onhold,dropped,ptr]\n\n');
        return false;
    }
    if(user.length > 3) {
        message.channel.send('Error: Too many arguments\n > User Commands: \n' +
        'a!user [mal username] anime\n' +
        'a!user [mal username] manga\n' +
        'a!user [mal username] anime [watching,completed,onhold,dropped,ptw]\n\n' +
        'a!user [mal username] manga [reading,completed,onhold,dropped,ptr]\n\n');
        return false;
    }
    if(user[1] != 'anime' && user[1] != 'manga')
        return false;
    if(user.length == 3) {
        let a = user[2].toLowerCase();
        if(user[1] == 'anime') {
            if(a != 'watching' && a != 'completed' && a != 'onhold' && a != 'dropped' && a != 'ptw') {
                message.channel.send('Error: Third argument was not correct\n > User Commands: \n' +
                'a!user [mal username] anime\n' +
                'a!user [mal username] manga\n' +
                'a!user [mal username] anime [watching,completed,onhold,dropped,ptw]\n\n' +
                'a!user [mal username] manga [reading,completed,onhold,dropped,ptr]\n\n');
                return false;
            }
        }
        else {
            if(a != 'reading' && a != 'completed' && a != 'onhold' && a != 'dropped' && a != 'ptr') {
                message.channel.send('Error: Third argument was not correct\n > User Commands: \n' +
                'a!user [mal username] anime\n' +
                'a!user [mal username] manga\n' +
                'a!user [mal username] anime [watching,completed,onhold,dropped,ptw]\n\n' +
                'a!user [mal username] manga [reading,completed,onhold,dropped,ptr]\n\n');
                return false;
            }
        }
    }
    if(await testUserExists(message,payload) == undefined)
        return false;
    return true;
}

const testUserExists = async (message,payload) => {
    const user = payload.split(' ');
    try {
        return await         
        axios({
            method: 'GET',
            url: `https://api.jikan.moe/v3/user/${user[0]}/profile`
        })
    } catch (error) {
        message.channel.send('Error: Could not find user');
        return;
    }
}
  
const getUser = async (message,payload) => {
    const typeOfSearch = payload.split(' ');
    console.log('test')
    if(await testInput(message,payload)) {
        const user = await queryUser(message,payload);
        console.log(user)
        if(typeOfSearch[1] == 'anime')
            formatAnimeTitlesAndSendMessage(message,user);
        else {
            formatMangaTitlesAndSendMessage(message,user);
        }
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
            return '> ' + a.title + '\tPlan To Watch' + '\n' ;
        }
    }); 
    if(userAnimeTitles.length == 0) {
        message.channel.send('Could not find anime that fit those criteria');
    }
    for(let x = 0; x < userAnimeTitles.length; x+=25) {
        message.channel.send(userAnimeTitles.slice(x,x+25))
    }
}

const formatMangaTitlesAndSendMessage = (message,user) => {
    if(user == undefined) return;

    const userMangaTitles = user.data.manga.map(function(m) {
        let status = '';
        if(m.reading_status == 1)
            status = 'Reading'
        else if(m.reading_status == 2)
            status = 'Completed';
        else if(m.reading_status == 3) 
            status = 'On Hold';
        else if(m.reading_status == 4) 
            status = 'Dropped';
        else 
            return '> ' + m.title + '\t' + 'Plan to Read';

        return '> ' + m.title + '\n' + status + '\tScore: ' + m.score + '\t Read Volumes: ' +
            m.read_volumes + '\t Read Chapters: ' + m.read_chapters;
    })

    console.log(userMangaTitles);
    if(userMangaTitles.length == 0) {
        message.channel.send('Could not find manga that fit those criteria');
    }
    for(let x = 0; x < userMangaTitles.length; x+=25) {
        message.channel.send(userMangaTitles.slice(x,x+25))
    }
    
}
  
module.exports = {
    name: 'user',
    description: 'returns info about mal username',
    async execute (message, payload){
        getUser(message,payload);
    }
}