import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config/sql-config';
import { AlbumController } from './controller/album.controller';
import { ArtistController } from './controller/artist.controller';
import { SongController } from './controller/song.controller';
import { Album } from './entity/album';
import { Artist } from './entity/artist';
import { Order } from './entity/order';
import { OrderDetail } from './entity/order-detail';
import { Song } from './entity/song';
import { User } from './entity/user';
import { AlbumService } from './service/album.service';
import { ArtistService } from './service/artist.service';
import { SongService } from './service/song.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
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
    AlbumController
  ],
  providers: [
    AppService,
    SongService,
    ArtistService,
    AlbumService
  ],
})
export class AppModule {}
