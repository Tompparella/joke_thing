import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, BaseEntity } from "typeorm"
import { Category } from "./Category"
import { Tag } from "./Tag"
import { Region } from "./Region"

@Entity()
export class Joke extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    text: string

    @ManyToOne(type => Region)
    @JoinColumn()
    region: Region;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

    @ManyToOne(type => Category)
    @JoinColumn()
    category: Category;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}
