import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from 'src/dto/CreateCharacter.dto';

@Controller('people')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  getCharacterList(@Query('page') page = 1) {
    return this.characterService.getCharacterList(page);
  }

  @Get(':id')
  getCharacterById(
    @Param('id') characterId: string,
    @Body() createCharacterDto: CreateCharacterDto,
  ) {
    //this.characterService.createCharacter(createCharacterDto);
    return this.characterService.getCharacterById(characterId, createCharacterDto);
  }
}
