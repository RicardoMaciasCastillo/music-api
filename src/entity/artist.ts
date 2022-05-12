import { Column, Entity, OneToMany } from "typeorm";
import { Album } from "./album";
import { Song } from "./song";

import BaseDataEntity from "./base-data-entity";

@Entity('artist')
export class Artist extends BaseDataEntity {

    @Column({ name: 'name', length: 120, nullable: false })
    name: string;

    @Column({ name: 'genre', length: 45 })
    genre: string;

    @Column({ name: 'nationality', length: 45, nullable: false })
    nationality: string;

    @Column({ name: 'image_url', length: 255, nullable: true })
    imageUrl: string;

    @OneToMany(() => Song, (song) => song.artist)
    songs: Song[];

    @OneToMany(() => Album, (album) => album.artist, { lazy: true })
    albums: Album[];
}