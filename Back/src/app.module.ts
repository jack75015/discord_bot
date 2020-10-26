import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresenceModule } from './presence/presence.module';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';
import config from './../config'


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'bot',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }), 
    PresenceModule,
    DiscordModule,
    ConfigModule,
  ],
  controllers: [],
})
export class AppModule {}
