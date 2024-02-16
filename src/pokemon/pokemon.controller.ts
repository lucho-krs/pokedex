import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create( @Body() createPokemonDto: CreatePokemonDto ) {
    return this.pokemonService.create( createPokemonDto );
  }

  @Get()
  findAll( @Query() params: PaginationDTO ) {
    return this.pokemonService.findAll( params );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne( term );
  }

  @Patch(':term')
  update( @Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto ) {
    return this.pokemonService.update( term, updatePokemonDto );
  }

  @Delete(':id')
  remove( @Param('id', ParseMongoIdPipe) id: string ) {
    return this.pokemonService.remove( id );
  }
}
