import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'characters' })
export class Character {
    @PrimaryColumn()
    id: number
    @Column()
    name: string
    @Column()
    height: string
    @Column()
    mass: string
    @Column()
    hairColor: string
    @Column()
    skinColor: string
    @Column()
    eyeColor: string
    @Column()
    birthYear: string
    @Column()
    gender: string
    @Column()
    homeworld: string
    @Column('json')
    films: string[]
    @Column('json')
    species: any[]
    @Column('json')
    vehicles: string[]
    @Column('json')
    starships: string[]
    @Column()
    created: string
    @Column()
    edited: string
    @Column()
    url: string
}
