const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { createDB } = require('../Util/utils')

module.exports = {
        
	async run(bot, interaction) {
        const user = interaction.options.getUser("user") || interaction.user
        const userDB = bot.db.get(user.id) || createDB()

        const e = new Discord.MessageEmbed()
            //.setAuthor({ name:`Menace Sits`, iconURL: bot.user.displayAvatarURL() })
            .setTitle(`Sits System | Counter`)
            .setColor('GREEN')
            //.setThumbnail(bot.user.displayAvatarURL())
            //.setFooter({ text: `KD Development | discord.gg/kye 😎`, iconURL: bot.user.displayAvatarURL() })
            .setTimestamp();

        const counter = userDB.counters?.[interaction.guild.id]
        if (!counter) {
            return interaction.reply({ embeds: [e.setDescription(`[**SUCCESS**] => The count for this user is **0.**`)] });
        } else {
            return interaction.reply({ embeds: [e.setDescription(`[**SUCCESS**] => The count for this user is **${counter}**`)] });
        }
	},

	config: {
		//adminOnly: true
	},
	
	data: new SlashCommandBuilder()
		.setName('show-count')
		.setDescription('Show user count')
        .addUserOption(o => o
            .setName('user')
            .setDescription('The user whose count you want to check')    
        )
};