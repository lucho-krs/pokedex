import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonService } from '../pokemon/pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from '../pokemon/entities/pokemon.entity';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  controllers: [
    SeedController
  ],
  providers: [
    SeedService,
  ],
  imports: [
    PokemonModule
  ]
})
export class SeedModule {}
