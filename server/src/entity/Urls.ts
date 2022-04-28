import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('urls')
export default class Urls {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  url: string;

  @Column()
  short_code: string;

  @Column()
  times_redeemed: number;

  @Column()
  readonly created_at: Date;

  @Column()
  updated_at: Date;

  private constructor(
    id: string,
    url: string,
    short_code: string,
  ) {
    this.id = id;
    this.url = url;
    this.times_redeemed = 0;
    this.short_code = short_code;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  public static create(
    url: string,
    short_code: string,
  ): Urls {
    const id = uuidv4();
    return new Urls(id, url, short_code);
  }
}