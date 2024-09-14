import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios'
import { map } from 'rxjs';
import { CreateCharacterDto } from 'src/dto/CreateCharacter.dto';
import { Character } from 'src/typeorm/entities/Character';
import { CreateCharacterParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(Character) private characterRepository: Repository<Character>,
    ) { }

    getCharacterList(page: number) {
        const url = 'https://swapi.dev/api/people/?page=' + page;

        const http_result = this.httpService.get(url)
            .pipe(map((response: AxiosResponse) => {
                const { results: data, count: total, next, previous } = response.data;

                let new_data = [];

                data.forEach(element => {
                    const { name,
                        height, mass,
                        hair_color: hairColor,
                        skin_color: skinColor,
                        eye_color: eyeColor,
                        birth_year: birthYear,
                        gender, homeworld, films, species, vehicles,
                        starships, created, edited, url
                    } = element;

                    new_data.push({ name,
                        height, mass, hairColor, skinColor,
                        eyeColor, birthYear, gender, homeworld,
                        films, species, vehicles, starships,
                        created, edited, url
                    });
                });

                return {total, new_data};
            }))

        return http_result;
    }

    getCharacterById(characterId: string, createCharacterDto: CreateCharacterDto) {
        const url = 'https://swapi.dev/api/people/' + characterId;

        const http_result = this.httpService
            .get(url)
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
                return { name,
                    height, mass, hairColor, skinColor,
                    eyeColor, birthYear, gender, homeworld,
                    films, species, vehicles, starships,
                    created, edited, url
                };
            }))

        return http_result;
    }

    createCharacter(characterDetails: CreateCharacterParams) {
        
    }
}
