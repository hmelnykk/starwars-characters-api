import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { map } from 'rxjs';

@Injectable()
export class CharacterService {
    constructor(private readonly httpService: HttpService) {}

    getCharacterList(page: number) {
        const url = 'https://swapi.dev/api/people/?page=' + page;

        const http_result = this.httpService.get(url)
            .pipe(map((response: AxiosResponse) => {
                const { results, count, next, previous } = response.data;

                return { results, count, next, previous };
            }))

        return http_result;
    }

    getCharacterById(characterId: string) {
        const url = 'https://swapi.dev/api/people/' + characterId;

        const http_result = this.httpService
            .get(url)
            .pipe(map((response: AxiosResponse) => {
                return response.data;
            }))

        return http_result;
    }
}
