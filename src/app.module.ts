import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// NestJS common files
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

// Helper methods
import { getEnvPath } from './common/helper/env.helper';

// Controllers
import { AlbumController } from './controller/album.controller';
import { ArtistController } from './controller/artist.controller';
import { SongController } from './controller/song.controller';
import { UserController } from './controller/user.controller';
import { Album } from './entity/album';
import { Artist } from './entity/artist';
import { Order } from './entity/order';
import { OrderDetail } from './entity/order-detail';
import { Song } from './entity/song';
import { User } from './entity/user';

// Services
import { AlbumService } from './service/album.service';
import { ArtistService } from './service/artist.service';
import { SongService } from './service/song.service';
import { UserService } from './service/user.service';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([
      Album,
      Artist,
      Order,
      OrderDetail,
      Song,
      User
    ])
  ],
  controllers: [
    AppController,
    SongController,
    ArtistController,
    AlbumController,
    UserController
  ],
  providers: [
    AppService,
    SongService,
    ArtistService,
    AlbumService,
    UserService
  ],
})
export class AppModule {}
