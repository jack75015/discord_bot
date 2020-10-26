import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Presence } from './presence.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PresenceService {
  private logger: Logger;

  constructor(
    @InjectRepository(Presence)
    private readonly presenceRepository: Repository<Presence> ) { 
      this.logger = new Logger('PresenceService');
      this.logger.log('PresenceService Init');
    }

  create(presence: Presence): Promise<Presence> {
    this.logger.log(`Create:  ${JSON.stringify(presence)}`);
    return this.presenceRepository.save(presence);
  }

  findAll(): Promise<Presence[]> {
    const result = this.presenceRepository.find()
    this.logger.log(`FindAll:  ${JSON.stringify(result)}`);
    return result;
  }
}