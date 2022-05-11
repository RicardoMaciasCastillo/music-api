import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseDataEntity from "./base-data-entity";
import { OrderDetail } from "./order-detail";
import { User } from "./user";

@Entity('order')
export class Order extends BaseDataEntity {

    @Column({ name: 'date', nullable: false })
    date: Date;

    @Column({ name: 'total' })
    total: number;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetails: OrderDetail[];

}