import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Album } from "./album";

import BaseDataEntity from "./base-data-entity";

import { Order } from "./order";
import { Song } from "./song";

@Entity('order_detail')
export class OrderDetail extends BaseDataEntity {

    @ManyToOne(() => Order, (order) => order.orderDetails)
    @JoinColumn({name: 'order_id', referencedColumnName: 'id'})
    order: Order;

    @OneToOne(() => Song)
    @JoinColumn({name: 'song_id', referencedColumnName: 'id'})
    song: Song;

    @OneToOne(() => Album)
    @JoinColumn({name: 'album_id', referencedColumnName: 'id'})
    album: Album;

}