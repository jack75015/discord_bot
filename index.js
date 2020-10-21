const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";
let timer;
let count = 4;
let arg0 = 0;
let interval = 4;

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "event") {
    arg0 = args[0] || undefined;
    if (arg0 === "stop") {
        stopEvent(message);
    } else if (!isNaN(arg0)) {
      startTimer(message);
    } else {
      message.channel.send("parameter missing/wrong  -  see `!help`");
    }
  }
  else if (command === "help") {
    message.channel.send("exemple of new time box: \n ```!event 10``` \n To have a `10` minutes time box (with 4 reminders)");
  } else {
    message.channel.send(`unknow command ${command}`);
  }
});

client.login(config.BOT_TOKEN);

function startTimer(message){
    arg0 = Math.trunc(arg0);
    interval = arg0 / 4;
    count = 4;
    clearInterval(timer);
    message.channel.send(
    `Start meeting timer for ${arg0} minute(s) ( with 4 reminders)`
    );
    timer = setInterval(() => timeControl(message), interval * 1000);
}

function timeControl(message) {
  count--;
  if (count <= 0) {
    clearInterval(timer);
    message.channel.send(`Meeting finish! \n Thanks to go to an other channel if you want to continue your discussion 🙊`);
    // message.channel.members.forEach((member) => {
    //     member.voice.kick();
    // });
  } else {
    message.channel.send(`Meeting finish in ${parseFloat(interval * count).toFixed(2)} minutes`);
  }
}

function stopEvent(message){
    message.channel.send(`Stop timer!`);
    clearInterval(timer);
}
