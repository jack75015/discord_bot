import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Presence {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  date: string;

  @Column()
  userName: string;

  @Column()
  userId: string;

  @Column()
  status: string;

  @Column()
  channelName: string;

  @Column()
  channelId: string;
}