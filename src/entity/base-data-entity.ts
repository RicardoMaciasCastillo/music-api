import { 
    CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn,
    BaseEntity, Column, Generated, PrimaryGeneratedColumn 
} from 'typeorm';
  
class BaseDataEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @Column({ name: 'uuid' })
    @Generated("uuid")
    uuid: string;

    @VersionColumn()
    version: number;

}
  
export default BaseDataEntity;