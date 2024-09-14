import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './typeorm/entities/Character';

@Module({
  imports: [CharacterModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'newuser_swapi',
    password: 'AbCdEf52',
    database: 'sw_characters_api',
    entities: [Character],
    synchronize: true,

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
