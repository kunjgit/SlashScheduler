const { REST, Routes } = require('discord.js');

const cid = process.env['CLIENT_ID']
const gid = process.env['GUILD_ID']
const token = process.env['token']
const commands = [
  {
    name: 'mumma',
    description: 'This command describes my mumma!',
  },
  {
    name: 'meethu',
    description: 'Gives positive vibes to mumma!',
  },
  {
    name: 'reminder',
    description: 'This will give the remider to mumma ',
  },
  {
    name: 'fav',
    description: 'Will give the favourite song for my mumma',
  },
  {
    name: 'nothing',
    description: 'this will give the developer site url',
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