import { Column, Entity, OneToMany } from "typeorm";
import { Order } from "./order";

import BaseDataEntity from "./base-data-entity";

@Entity('user')
export class User extends BaseDataEntity {
    
    @Column({name:'name', length: 100, nullable: false})
    name: string

    @Column({name:'email', length:100, nullable: false, unique: true})
    email: string 

    @Column({name:'password', length: 255,  nullable: false})
    password: string
        
    @Column({name:'type', length: 15})
    type: string

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

}