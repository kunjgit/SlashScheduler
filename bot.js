const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');
const moment = require('moment-timezone');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });
const mySecret = process.env['token'];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("project is running!");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});





client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'command1') {
    await interaction.reply('Reply you want to give');
  } else if (interaction.commandName === 'command2') {
    await interaction.reply('Reply 2');
  } 
});

// Function to send a message to a specific user
const sendMessageToUser = (userId, message) => {
  client.users.fetch(userId).then((user) => {
    const taggedMessage = ` <@${userId}>, ${message}`; // Include the user mention in the message
    user.send(taggedMessage).catch((error) => {
      console.error(`Failed to send DM to the user: ${error}`);
    });
  });
};

const getRandomQuote = async () => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    return response.data.content;
  } catch (error) {
    console.error(`Failed to fetch quote: ${error}`);
    return '';
  }
};

const scheduleMessages = async () => {
  const targetUserIdsSet = new Set(targetUserIds);

  const quote = await getRandomQuote(); // Fetch the random quote once

  for (const msg of messages) {
    const targetTime = moment().tz(targetTimeZone).set(msg.time);
    let delay = targetTime.valueOf() - moment().valueOf();
    if (delay < 0) {
      delay += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds for the next day
    }

    setTimeout(() => {
      const message = msg.message === 'Message 1' ? `\n ${quote}` : msg.message;
      for (const userId of targetUserIdsSet) {
        sendMessageToUser(userId, message);
      }
    }, delay);
  }
};

const targetUserIds = ['replacewithyourid']; // Replace with the target user IDs
const targetTimeZone = 'Asia/Kolkata'; // Replace with the target time zone

const messages = [
  { time: { hour: 8, minute: 0 }, message: 'Message 1' },
  { time: { hour: 12, minute: 0 }, message: 'Message 2' },
  { time: { hour: 18, minute: 0 }, message: 'Message 3' },
];

client.login(mySecret);
scheduleMessages();
