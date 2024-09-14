import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { response } from 'express';
import { map } from 'rxjs';
import { CreateCharacterDto } from 'src/dtos/CreateCharacter.dto';
import { Character } from 'src/typeorm/entities/Character';
import { CreateCharacterParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(Character) private characterRepository: Repository<Character>,
    ) {}

    getCharacterList(page: number, createCharacterDto: CreateCharacterDto) {
        const url = 'https://swapi.dev/api/people/?page=' + page;

        const http_result = this.httpService.get(url)
            .pipe(map((response: AxiosResponse) => {
                const { results, count: total } = response.data;

                let data = [];

                results.forEach(element => {
                    const { name,
                        height, mass,
                        hair_color: hairColor,
                        skin_color: skinColor,
                        eye_color: eyeColor,
                        birth_year: birthYear,
                        gender, homeworld, films, species, vehicles,
                        starships, created, edited, url
                    } = element;

                    const elementId = parseInt(url.split('/').reverse()[1]); // get an Id from url
                    const el = this.characterRepository.findOneBy({id: elementId});

                    if ( el )
                    {
                        const newCharacter = this.characterRepository.create({ id: elementId, name,
                            height, mass, hairColor, skinColor,
                            eyeColor, birthYear, gender, homeworld,
                            films, species, vehicles, starships,
                            created, edited, url,
                        });
                        this.characterRepository.save(newCharacter);
                    }

                    data.push({ name,
                        height, mass, hairColor, skinColor,
                        eyeColor, birthYear, gender, homeworld,
                        films, species, vehicles, starships,
                        created, edited, url
                    });
                });

                return {total, data};
            }))

        return http_result;
    }

    getCharacterById(characterId: string, createCharacterDto: CreateCharacterDto) {

        // try to find a character in db
        const el = this.characterRepository.findOneBy( {id: parseInt(characterId)} )
            .then((characterFromDB) => {
                if (!characterFromDB) {
                    // id is not in the db
                    const url = 'https://swapi.dev/api/people/' + characterId;

                    const http_result = this.httpService.get(url)
                        .pipe(map((response: AxiosResponse) => {
                            const { name,
                                height, mass,
                                hair_color: hairColor,
                                skin_color: skinColor,
                                eye_color: eyeColor,
                                birth_year: birthYear,
                                gender, homeworld, films, species, vehicles,
                                starships, created, edited, url
                            } = response.data;

                            // save data of the character to the database
                            const newCharacter = this.characterRepository.create({ id: parseInt(characterId), name,
                                height, mass, hairColor, skinColor,
                                eyeColor, birthYear, gender, homeworld,
                                films, species, vehicles, starships,
                                created, edited, url,
                            });
                            this.characterRepository.save(newCharacter);

                            return { name,
                                height, mass, hairColor, skinColor,
                                eyeColor, birthYear, gender, homeworld,
                                films, species, vehicles, starships,
                                created, edited, url
                            };
                        }))

                    return http_result;
                }

                // id is in the db
                const {id, ...characterDataDB} = characterFromDB;
                return characterDataDB;
            })
            .catch((error) => {
                return error.data;
            })

        return el;
    }

    createCharacter(characterDetails: CreateCharacterParams) {
        
    }
}
