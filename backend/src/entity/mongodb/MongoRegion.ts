import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm"

@Entity()
export class MongoRegion {

    @ObjectIdColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

}
