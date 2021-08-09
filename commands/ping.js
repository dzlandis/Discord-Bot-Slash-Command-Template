const Discord = require("discord.js");

module.exports = {
  name: 'ping',
  description: "Pings the bot and shows API Latency.",
  async execute(interaction) {
    // Have the client start typing:
    // Send back a reply when the specific command has been written
      const ping = new Date().getTime() - interaction.createdTimestamp;
      const APILatency = interaction.client.ws.ping
      // npm i @lukeed/ms (basically a hyperfast ms lib)
      const { format } = require('@lukeed/ms'); // Credit to Axis#1010 for showing me!
      const uptime = format(interaction.client.uptime, true); // 1m (if uptime === 60000)

      const pingEmbed = new Discord.MessageEmbed()
        .setColor('WHITE')
        .addField('Ping:', `${ping}ms`, true)
        .addField('<-----🏓----->', '\u200b', true)
        .addField('API Latency', `${APILatency}ms`, true)
        .addField('Uptime:', `${uptime}`, false)
      interaction.reply({ embeds: [pingEmbed], ephemeral: true})
      console.log(`Ping: ${ping}ms, API Latency: ${interaction.client.ws.ping}ms, Uptime: ${uptime}`)
  }
}