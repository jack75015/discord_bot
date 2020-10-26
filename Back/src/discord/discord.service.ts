import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { PresenceService } from 'src/presence/presence.service';
import { Presence } from 'src/presence/presence.entity';

@Injectable()
export class DiscordService {

  private client = new Client();

  public prefix = "!";
  private timer;
  private count = 4;
  private arg0: number | string = 0;
  private interval = 4;
  private logger: Logger;

  constructor(private configService: ConfigService, private presenceService: PresenceService) {
    this.logger = new Logger('DiscordService');
    this.logger.log('DiscordService Init');
    this.start();
  };

  public start() {
    this.logger.log('Discord Bot Start');
    this.startMessage();
    this.startPresenceUpdate();
    this.client.login(this.configService.get<string>('BOT_TOKEN'));
  }

  public startMessage() {
    this.client.on("message", message => {
      if (message.author.bot) return;
      if (!message.content.startsWith(this.prefix)) return;

      const commandBody = message.content.slice(this.prefix.length);
      const args = commandBody.split(" ");
      const command = args.shift().toLowerCase();

      if (command === "event") {
        this.arg0 = args[0] || undefined;
        if (this.arg0 === "stop") {
          this.stopEvent(message);
        } else if (!isNaN(this.arg0 as unknown as number)) {
          this.startTimer(message);
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
  }


  public startTimer(message) {
    this.logger.log(`Discord Bot Start Timer for ${this.arg0} minute(s)`);

    this.arg0 = Math.trunc(this.arg0 as number);
    this.interval = this.arg0 / 4;
    this.count = 4;
    clearInterval(this.timer);
    message.channel.send(
      `Start meeting timer for ${this.arg0} minute(s) ( with 4 reminders)`
    );
    this.timer = setInterval(() => this.timeControl(message), this.interval * 1000);
  }

  public timeControl(message) {
    this.count--;
    if (this.count <= 0) {
      clearInterval(this.timer);
      message.channel.send(`Meeting finish! \n Thanks to go to an other channel if you want to continue your discussion 🙊`);
      // message.channel.members.forEach((member) => {
      //     member.voice.kick();
      // });
    } else {
      message.channel.send(`Meeting finish in ${(this.interval * this.count).toFixed(2)} minutes`);
    }
  }

  public stopEvent(message) {
    this.logger.log(`Discord Bot Stop Event`);
    message.channel.send(`Stop timer!`);
    clearInterval(this.timer);
  }

  public startPresenceUpdate() {
    this.logger.log(`Discord Bot Start Presence Update`);
    this.client.on('presenceUpdate', (oldPresence, newPresence) => {
      if (newPresence) {
        this.logger.log(`User ${newPresence.user.username} is now ${newPresence.status}`);
        // this.directMessageAdmin(`User ${newPresence.user.username} is now ${newPresence.status}`);
        const presence: Presence = {
          date: (Date.now()).toString(),
          userName: newPresence.user.username,
          userId: newPresence.user.id,
          status: newPresence.status,
          channelName: newPresence.guild.name,
          channelId: newPresence.guild.id
        }
        this.presenceService.create(presence)
      }
    })
  }

  public directMessageAdmin(msg) {
    this.client.users.cache.get(this.configService.get<string>('ADMIN_ID')).send(msg);
  }

}