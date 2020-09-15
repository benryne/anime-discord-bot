
const getScheduleCommandsInfo = () => {
    return '> Schedule Commands: \n' +
        'a!schedule \n' + 
        'a!schedule [day of the week]\n\n';
}

const getSeasonCommandsInfo = () => {
    return '> Season Commands: \n' +
        'a!season [season] [year]\n\n';
}

const getAnimeCommandsInfo = () => {
    return '> Anime Commands: \n' +
    'a!anime [title]\n\n';
}

const getMangaCommandsInfo = () => {
    return '> Manga Commands: \n' +
    'a!manga [title]\n\n';
}

const getUserCommandsInfo = () => {
    return '> User Commands: \n' +
    'a!user [mal username]\n' +
    'a!user [mal username] [watching,completed,on hold,dropped,plan to watch]\n\n';
}

const getCommandsInfo = () => {
    return getScheduleCommandsInfo() + getSeasonCommandsInfo() + getAnimeCommandsInfo() + 
        getMangaCommandsInfo() + getUserCommandsInfo();
}

module.exports = {
    name: 'help',
    description: 'returns info about commands',
    async execute (message, payload){
        const commandInfo = getCommandsInfo();
        message.channel.send(commandInfo);
    }
}