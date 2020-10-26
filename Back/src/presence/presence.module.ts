import { Module } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PresenceController } from './presence.controller';
import { Presence } from './presence.entity';
import { TypeOrmModule } from '@nestjs/typeorm'


@Module({
  imports: [TypeOrmModule.forFeature([Presence])],
  providers: [PresenceService],
  controllers: [PresenceController],
  exports: [PresenceService]
})
export class PresenceModule {}
