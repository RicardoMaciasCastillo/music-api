import { Album } from '@/entity/album';
import { Artist } from '@/entity/artist';
import { Order } from '@/entity/order';
import { OrderDetail } from '@/entity/order-detail';
import { Song } from '@/entity/song';
import { User } from '@/entity/user';

import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get<string>('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      namingStrategy: new SnakeNamingStrategy,
      synchronize: true,
      logging: true,
      entities: [
        Album, Artist, Order, 
        OrderDetail, Song, User
      ],
    };
  }
}