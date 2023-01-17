import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from './../../../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  /**
   *  Get the pokemon list
   */
  public async getPokemonList(offset:number = 0, limit:number = 0) {
    try {
      let response = await axios.get(environment.apiUrl + `pokemon?offset=${offset}&limit=${limit}`, {
        headers: {},
      });
      console.log("response getPokemonList: ", response.data)

      return response.data;
    } catch (err) {
      return err;
    }
  }

  /**
   *  Get a pokemon
  */
    public async getPokemon(pokemonName:string) {
      try {
        let response = await axios.get(environment.apiUrl + `pokemon/${pokemonName}`, {
          headers: {},
        });
        console.log("response getPokemon: ", response.data)
  
        return response.data;
      } catch (err) {
        return err;
      }
    }
}
