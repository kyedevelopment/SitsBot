const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { createDB } = require('../Util/utils');

module.exports = {
	async run(bot, interaction) {
		const counters = [];
		interaction.guild.members.cache.forEach(member => {
			const userDB = bot.db.get(member.id) || createDB();
			const counter = userDB.counters?.[interaction.guild.id];
			if (counter) counters.push({ user: member.user.tag, count: counter });
		});
		if (counters.length === 0) {
			console.log('There are no counters in this server.');
			return interaction.reply({ content: 'There are no counters in this server.' });
		}
		counters.sort((a, b) => b.count - a.count);
		const leaderboard = counters.map((counter, index) => `${index + 1}. ${counter.user}: ${counter.count}`).join('\n');

		const embed = new Discord.MessageEmbed()
			.setTitle(`Sits System | Leaderboard`)
			.setColor('GREEN')
			.setDescription(`\`\`\`${leaderboard}\`\`\``)
			//.setFooter({ text: `KD Development | discord.gg/kye 😎`, iconURL: bot.user.displayAvatarURL() })
			.setTimestamp();
		return interaction.reply({ embeds: [embed] });
	},

	config: {
		//adminOnly: true
	},

	data: new SlashCommandBuilder()
		.setName('showcount-all')
		.setDescription('Show all user counters in the server'),
};
