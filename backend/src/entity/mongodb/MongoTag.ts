import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm"

@Entity()
export class MongoTag {

    @ObjectIdColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

}
