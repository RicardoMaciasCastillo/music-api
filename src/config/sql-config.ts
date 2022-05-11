import { Album } from "src/entity/album";
import { Artist } from "src/entity/artist";
import { Order } from "src/entity/order";
import { OrderDetail } from "src/entity/order-detail";
import { Song } from "src/entity/song";
import { User } from "src/entity/user";

import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const dbConfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: "music_app",
    username: "root",
    password: "admin",
    namingStrategy: new SnakeNamingStrategy,
    synchronize: true,
    logging: true,
    entities: [
        Album,
        Artist,
        Order,
        OrderDetail,
        Song,
        User
    ]
}