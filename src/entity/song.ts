import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Album } from "./album";
import { Artist } from "./artist";

import BaseDataEntity from "./base-data-entity";

@Entity('song')
export class Song extends BaseDataEntity {

    @Column({ name: 'name', length: 120, nullable: false })
    name: string;

    @Column({ name: 'duration', nullable: false })
    duration: number;

    @Column({ name: 'type', length: 10, nullable: false })
    type: string;

    @Column({ name: 'preview_url', length: 255, nullable: true })
    previewUrl: string;

    @Column({ name: 'price', nullable: false })
    price: number;

    @Column({ name: 'top', nullable: false })
    top: boolean;

    @ManyToOne(() => Album, (album) => album.songs)
    @JoinColumn({name: 'album_id', referencedColumnName: 'id'})
    album: Album;

    @ManyToOne(() => Artist, (artist) => artist.songs)
    @JoinColumn({name: 'artist_id', referencedColumnName: 'id'})
    artist: Artist;

}