import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create( createPokemonDto: CreatePokemonDto ) {

    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try { 
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    } catch ( err ) {
      this.handleExceptions( err );
    }

  }

  async findAll() {
    const pokemons = await this.pokemonModel.find();
    return pokemons;
  }

  async findOne( term: string ) {
    let pokemon: Pokemon;

    if ( !isNaN( +term )) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if ( !pokemon ) 
      throw new NotFoundException(`Pokemon whit id, name or no "${term}" not found`);

    return pokemon;
  }

  async update(
    term: string, 
    updatePokemonDto: UpdatePokemonDto
  ) {
    try {
      const pokemon = await this.findOne( term );
      if ( updatePokemonDto.name ) {
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      }

      await pokemon.updateOne( updatePokemonDto );
      return {
        ...pokemon.toJSON(), ...updatePokemonDto
      };
    } catch (err) {
      this.handleExceptions( err );
    }
  }

  async remove( id: string ) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if ( deletedCount === 0) {
      throw new BadRequestException(`Pokemon whit id "${ id }" not found`)
    }
    
    return;
  }

  private handleExceptions( error: any ) {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue )}`)
    }

    throw new InternalServerErrorException(`Can't create Pokemon - Check server log`);
  }
}
