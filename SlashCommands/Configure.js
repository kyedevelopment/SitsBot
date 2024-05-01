const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
        
	async run(bot, interaction) {
        const sitsChat = interaction.options.getChannel('sits-channel')
        //const logChat = interaction.options.getChannel('log-channel')
        const notifChat = interaction.options.getChannel('notification-channel')

        bot.data.set(interaction.guild.id, {
            sitsChatID: sitsChat.id,
            //logChatID: logChat.id,
            notificationChatID: notifChat.id
        })

        interaction.reply({ content: `Channels were set`, ephemeral: true })
	},

	config: {
        permission: 'ADMINISTRATOR'
		//adminOnly: true
	},
	
	data: new SlashCommandBuilder()
		.setName('configure')
		.setDescription('Configure the bot for your server')
        .addChannelOption(o => o
            .setName('sits-channel')  
            .setDescription('The channel where sits will be counted')
            .setRequired(true)  
            .addChannelTypes(0)
        )
        //.addChannelOption(o => o
        //    .setName('log-channel')
        //    .setDescription('The channel where deletes will be logged')
        //    .setRequired(true) 
        //    .addChannelTypes(0)
        //)
        .addChannelOption(o => o
            .setName('notification-channel')
            .setDescription('The channel where sits notifications will be send')
            .setRequired(true) 
            .addChannelTypes(0)
        )
};