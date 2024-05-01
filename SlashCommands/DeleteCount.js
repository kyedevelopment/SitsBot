const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
        
	async run(bot, interaction) {
        const user = interaction.options.getUser('user')
        if(!bot.db.has(user.id)) return interaction.reply({ content: 'That user has no sits recorded', ephemeral: true })

        //const guildDB = bot.data.get(reaction.message.guild.id)

        //const logsChannel = bot.channels.cache.get(guildDB.logChatID)
        const e = new Discord.MessageEmbed()
            .setTitle(`Sits System | Counter`)
            .setColor('RED')
            //.setFooter({ text: `KD Development | discord.gg/kye 😎`, iconURL: bot.user.displayAvatarURL() })
            .setTimestamp();

        //bot.db.delete(`reactedSitsByAdmins`)
        bot.db.set(`${user.id}.counters.${interaction.guild.id}`, 0)
        
        //logsChannel?.send({ embeds: [e.setDescription(`[**SITS COUNT DELETED!**] -> ${user}'s sits count has been deleted.`)] })
        interaction.reply({ embeds: [e.setDescription(`[**SUCCESS**] => The sits count for ${user} got deleted.`)] })
	},

	config: {
        permission: "ADMINISTRATOR",
		//adminOnly: true
	},
	
	data: new SlashCommandBuilder()
		.setName('delete-count')
		.setDescription('Delete user\'s count')
        .addUserOption(o => o
            .setName('user')
            .setDescription('The user whose count you want to delete')    
            .setRequired(true)
        )
}