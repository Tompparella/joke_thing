import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, BaseEntity } from "typeorm"

@Entity()
export class MongoJoke extends BaseEntity {

    @ObjectIdColumn()
    id: string

    @Column()
    name: string

    @Column()
    text: string

    @Column()
    regionId: number;

    @Column()
    tags: number[];

    @Column()
    categoryId: number;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}
