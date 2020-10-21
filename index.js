const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";
let timer;
let count = 0;
let arg0 = 0;
let arg1 = 0;

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "event") {
    arg0 = args[0] ?? undefined;
    arg1 = args[1] ?? undefined;

    if (arg0 === "stop") {
        stopEvent(message);
    } else if (!isNaN(arg0)) {
      startTimer(message);
    } else {
      message.channel.send("parameter missing/wrong  -  see `!help`");
    }
  }
  else if (command === "help") {
    message.channel.send("exemple of new time box: \n ```!event 10 2``` \n To have a `10` minutes time box with reminder every `2` minutes");
  } else {
    message.channel.send(`unknow command ${command}`);
  }
});

client.login(config.BOT_TOKEN);

function startTimer(message){
    if (arg1) {
        clearInterval(timer);
        count = arg0 / arg1;
        message.channel.send(
        `Start meeting timer for ${arg0} minutes, with a reminder every ${arg1} minute(s)`
        );
        timer = setInterval(() => timeControl(message), arg1 * 1000);
    } else {
        message.channel.send(`No reminder parameter`);
      }
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
    message.channel.send(`Meeting finish in ${arg1 * count} minutes`);
  }
}

function stopEvent(message){
    message.channel.send(`Stop timer!`);
    clearInterval(timer);
    count = 0;
    arg1 = 0;
}
