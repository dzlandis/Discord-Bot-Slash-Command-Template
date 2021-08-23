const Discord = require("discord.js");

module.exports = {
  name: 'ping',
  description: "Pings the bot and shows API Latency.",
  async execute(interaction) {
      const msg = await interaction.deferReply({ fetchReply: true });
      const ping = msg.createdTimestamp - interaction.createdTimestamp;
      const APILatency = interaction.client.ws.ping
      // npm i @lukeed/ms (basically a hyperfast ms lib)
      const { format } = require('@lukeed/ms');
      const uptime = format(interaction.client.uptime, true); // 1m (if uptime === 60000)

      const pingEmbed = new Discord.MessageEmbed()
        .setColor('WHITE')
        .addField('Ping:', `${ping}ms`, true)
        .addField('<-----🏓----->', '\u200b', true)
        .addField('API Latency', `${APILatency}ms`, true)
        .addField('Uptime:', `${uptime}`, false)
      interaction.editReply({ embeds: [pingEmbed], ephemeral: true})
      console.log(`Ping: ${ping}ms, API Latency: ${APILatency}ms, Uptime: ${uptime}`)
  }
}
