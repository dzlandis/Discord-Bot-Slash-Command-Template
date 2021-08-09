// To do:
// Move to-do list to Github or Trello.
// Tell the bot to leave if nobody is in the VC.

// Logging
function getCurrentDateString() {
    return 'NAME_OF_BOT_HERE :: ' + (new Date()).toISOString() + ' ::';
  };
  __originalLog = console.log;
  console.log = function() {
    var args = [].slice.call(arguments);
    __originalLog.apply(console.log, [getCurrentDateString()].concat(args));
  };
  
  // Require discord.js package
  const { Client, Intents, Collection } = require("discord.js");
  
  // Create a new discord client using the new keyword
  const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
  
  // npm install @top-gg/sdk
  // Posts stats to top.gg
  // const AutoPoster = require('topgg-autoposter')
  
  // const ap = AutoPoster('topgg token', client)
  
  // ap.on('posted', () => {
  //   console.log('Posted stats to Top.gg!')
  // })
  
  // Require the config.json
  const { TOKEN } = require("./config.json");
  const config = require('./config.json');
  
  // Command handler requirement
  const fs = require('fs');
  // New command handler
  client.commands = new Collection();
  
  const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
  
    client.commands.set(command.name, command)
  }
  
  // What to do when a message is sent:
  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    if (!client.commands.has(interaction.commandName)) return;
  
    try {
      await client.commands.get(interaction.commandName).execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  
  });
  
  client.on('messageCreate', async msg => {
      if (!client.application?.owner) await client.application?.fetch();
  
      if (msg.content.toLowerCase() === '!deploy' && msg.author.id === client.application?.owner.id) {
          const data = {
              name: 'ping',
              description: 'Replies with Pong!',
          };
  
          const command = await client.guilds.cache.get('GUILDID_HERE')?.commands.create(data);
          console.log(command);
      }
  });
  
  // Display a message once the bot has starts and set a status
  client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const arrayOfStatus = [
      `${client.guilds.cache.size} servers!`,
    ];
  
    let index = 0;
    setInterval(() => {
      if (index === arrayOfStatus.length) index = 0;
      const status = arrayOfStatus[index];
      //console.log(status);
      client.user.setPresence({ activities: [{ name: status, type: "WATCHING" }] });
      index++;
    }, 10000); //in ms
  });
  
  // Log in the bot with the token
  client.login(TOKEN);