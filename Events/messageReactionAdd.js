const { ifError } = require("assert");
const { error } = require("console");
const { channel } = require("diagnostics_channel");
const { MessageEmbed } = require("discord.js");
const { errorMonitor } = require("events");
const { isErrored } = require("stream");
const { createDB } = require("../Util/utils");

module.exports = async (bot, reaction, user) => {

    if(reaction.partial) try { await reaction.fetch() } catch(err) { return console.log('Cant fetch reaction!') }

    if(!reaction.message.guild) return
    const guildDB = bot.data.get(reaction.message.guild.id)

    //if(!guildDB.sitsChatID) try { await bot.channels.cache.get(guildDB.sitsChatID)} catch(err) { return console.log('Cant fetch sits chat id!')}

    if (reaction.message.channelId === guildDB?.sitsChatID && reaction.message.embeds.length > 0) {
        let counter = bot.db.get(`reactedSitsByAdmins`) ?? bot.db.set('reactedSitsByAdmins', 0);
        if(!bot.db.has(user.id)) bot.db.set(user.id, createDB())

        counter = bot.db.add(`reactedSitsByAdmins`, 1);
        const userCount = bot.db.add(`${user.id}.counters.${reaction.message.guild.id}`, 1);
        userCount
        const counters = bot.db.fetch(`${user.id}.counters.${reaction.message.guild.id}`) || 0;

        const channel = bot.channels.cache.get(guildDB.notificationChatID);
        if (!channel) return;

        const e = new MessageEmbed()
            //.setAuthor({ name: `Sits System | Counter`, iconURL: bot.user.displayAvatarURL() })
            .setTitle(`Sits System | Counter`)
            .setColor('WHITE')
            //.setThumbnail(bot.user.displayAvatarURL())
            .setFooter({ text: `KD Development | discord.gg/kye 😎`, iconURL: bot.user.displayAvatarURL() })
            .setTimestamp();

        return channel.send({ embeds: [e.setDescription(`[**SUCCESS**] => Successfully counted the reaction for [**[Click Here!]**](${reaction.message.url}) [By: **${user.tag}**, Counter: **${counters}**]`)] });
    } else {
        return;
       //const e = new MessageEmbed()
       //    //.setAuthor({ name: `Sits System | Counter`, iconURL: bot.user.displayAvatarURL() })
       //    .setTitle(`Sits System | Counter`)
       //    .setColor('WHITE')
       //    //.setThumbnail(bot.user.displayAvatarURL())
       //    .setFooter({ text: `KD Development | discord.gg/kye 😎`, iconURL: bot.user.displayAvatarURL() })
       //    .setTimestamp();
       //return reaction.message.channel.send({ embeds: [e.setDescription('Could not find sits channel. Please run the /configure command and make sure bot has access to those channels')]});
    }//

}