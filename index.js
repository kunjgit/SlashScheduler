const { REST, Routes } = require('discord.js');

const cid = process.env['CLIENT_ID']
const gid = process.env['GUILD_ID']
const token = process.env['token']
const commands = [
  {
    name: 'C1',
    description: 'This command specifies the description that will be showed in discord',
  },
  {
    name: 'C2',
    description: 'This command specifies the description that will be showed in discord',
  }
 
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(cid), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
