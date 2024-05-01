module.exports = async (bot) => {
    require('../Handlers/SlashCommands.js')(bot);
    
    bot.user.setActivity(bot.config.activity, { type: 'WATCHING' })

    console.log(`${bot.user.tag} is online and is ready to serve ${bot.guilds.cache.size} guilds.`)

    var timerID = setInterval(function() {
        console.log(`${bot.user.tag} is online and is ready to serve ${bot.guilds.cache.size} guilds.`)
    }, 10800 * 1000)

    timerID
};