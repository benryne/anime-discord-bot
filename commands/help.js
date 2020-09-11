
const getScheduleCommandsInfo = () => {
    return '> Schedule Commands: \n' +
        'a!schedule \n' + 
        'a!schedule [day of the week]\n\n';
}

const getSeasonCommandsInfo = () => {
    return '> Season Commands: \n' +
        'a!season [season] [year]\n\n';
}

const getTitleCommandsInfo = () => {
    return '> Title Commands: \n' +
    'a!title [show title]\n\n';
}

const getUserCommandsInfo = () => {
    return '> User Commands: \n' +
    'a!user [mal username]\n' +
    'a!user [mal username] [watching,completed,on hold,dropped,plan to watch]\n\n';
}

const getCommandsInfo = () => {
    return getScheduleCommandsInfo() + getSeasonCommandsInfo() + getTitleCommandsInfo() + getUserCommandsInfo();
}

module.exports = {
    name: 'help',
    description: 'returns info about commands',
    async execute (message, payload){
        const commandInfo = getCommandsInfo();
        message.channel.send(commandInfo);
    }
}