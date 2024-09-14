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
    films: string[] // should be an array or another connected table 'Films'
    @Column('json')
    species: any[] // same as in line 26
    @Column('json')
    vehicles: string[] // same...
    @Column('json')
    starships: string[] // u got it
    @Column()
    created: string
    @Column()
    edited: string
    @Column()
    url: string
}
