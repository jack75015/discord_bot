import { Module } from '@nestjs/common';
import { PresenceModule } from 'src/presence/presence.module';
import { DiscordService } from './discord.service';


@Module({
    imports: [PresenceModule],
    providers: [DiscordService],
    exports: [DiscordService]
  })
export class DiscordModule {}
