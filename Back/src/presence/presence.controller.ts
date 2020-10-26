import { Controller, Get, Post, Body } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { Presence } from './presence.entity';

@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Get()
  getPresences() {
    return this.presenceService.findAll();
  }

  @Post()
  createPresence(@Body() body: Presence) {
    return this.presenceService.create(body);
  }
}
