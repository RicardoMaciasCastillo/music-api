import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Artist } from "./artist";
import BaseDataEntity from "./base-data-entity";
import { Song } from "./song";



@Entity('album')
export class Album extends BaseDataEntity {
    
    @Column({name:'name', length: 120, nullable: false})
    name: string;

    @Column({name:'type', length: 10,  nullable: false})
    type: string;
    
    @Column({name:'price', nullable: false})
    price: number;

    @Column({name:'image_url', length: 255})
    imageUrl: string;

    @Column({name:'release_date'})
    releaseDate: Date;

    @OneToMany(() => Song, (song) => song.album)
    songs: Song[];

    @ManyToOne(() => Artist, (artist) => artist.albums)
    @JoinColumn({name: 'artist_id', referencedColumnName: 'id'})
    artist: Artist;

}