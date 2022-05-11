import { Column, Entity, OneToMany } from "typeorm";
import { Order } from "./order";

import BaseDataEntity from "./base-data-entity";
import { UserType } from "src/type/user.type";

@Entity('user')
export class User extends BaseDataEntity {
    
    @Column({name: 'name', length: 100, nullable: false})
    name: string;

    @Column({name: 'email', length: 100, nullable: false, unique: true})
    email: string;

    @Column({name: 'password', length: 255,  nullable: false})
    password: string;
        
    @Column({name: 'type', length: 15, nullable: false})
    type: UserType;

    @Column({name: 'last_login_at', type: 'timestamp', nullable: true, default: null})
    lastLoginAt: Date;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

}