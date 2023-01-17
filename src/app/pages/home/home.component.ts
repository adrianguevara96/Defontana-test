import { Component, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {

  pokemons: any;
  pokemonsArray: any[] = [];

  //pokemon table
  displayedColumns: string[] = ['name'];

  //alphabet table
  displayedColumnsAlphabet:string[] = ['letter', 'count']

  //paginator
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  pageSizeOptions: number[] = [ 20, 50, 100];
  totalPages: number = 0;
  resultsLength: number = 0;

  //autocomplete
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;

  //pokemon selected
  pokemonSelected:any;
  pokemonFind:any;

  //alphabet
  abc = [
    {
      letter: 'a',
      count: 0
    },
    {
      letter: 'b',
      count: 0
    },
    {
      letter: 'c',
      count: 0
    },
    {
      letter: 'd',
      count: 0
    },
    {
      letter: 'e',
      count: 0
    },
    {
      letter: 'f',
      count: 0
    },
    {
      letter: 'g',
      count: 0
    },
    {
      letter: 'h',
      count: 0
    },
    {
      letter: 'i',
      count: 0
    },
    {
      letter: 'j',
      count: 0
    },
    {
      letter: 'k',
      count: 0
    },
    {
      letter: 'l',
      count: 0
    },
    {
      letter: 'ñ',
      count: 0
    },
    {
      letter: 'm',
      count: 0
    },
    {
      letter: 'n',
      count: 0
    },
    {
      letter: 'o',
      count: 0
    },
    {
      letter: 'p',
      count: 0
    },
    {
      letter: 'q',
      count: 0
    },
    {
      letter: 'r',
      count: 0
    },
    {
      letter: 's',
      count: 0
    },
    {
      letter: 't',
      count: 0
    },
    {
      letter: 'u',
      count: 0
    },
    {
      letter: 'v',
      count: 0
    },
    {
      letter: 'w',
      count: 0
    },
    {
      letter: 'x',
      count: 0
    },
    {
      letter: 'y',
      count: 0
    },
    {
      letter: 'z',
      count: 0
    },
  ];

  alphabet:any;

  constructor(
    private homeService: HomeService 
  ){}

  async ngAfterViewInit(){

  }
  async ngOnInit(){

    let getPokemons = await this.homeService.getPokemonList(0, this.pageSizeOptions[0]).then( response => {
      this.pokemons = new MatTableDataSource<any>(response.results);
      this.pokemonsArray = response.results;
      this.pokemons.paginator = this.paginator;
      this.totalPages = response.count;

      //count alphabet
      // for(let i = 0; i < this.abc.length; i++) {
      //   for(let j = 0; j < this.pokemonsArray.length; j++) {
      //     if(this.pokemonsArray[j].name[0].includes(this.abc[i].letter)){
      //       this.abc[i].count++;
      //     }
      //   }
      // }
      this.loadAlphabeth(this.abc, this.pokemonsArray);
      console.log(this.abc)

      // console.log(this.pokemonsArray)
    });

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val || ''))
    );
  }

  filter(val: string): string[] {
    // this.pokemons.filter = val.toLowerCase();
    return this.pokemonsArray
      .map(pokemon => pokemon.name)
        .filter(name =>
          name.toLowerCase().includes(val.toLowerCase())
        )
  }

  async getServerData(event: PageEvent) {
    let getPokemons = await this.homeService.getPokemonList(event.pageIndex * event.pageSize, event.pageSize).then(  response => {
      this.pokemons = new MatTableDataSource<any>(response.results);
      this.pokemonsArray = response.results;
      this.loadAlphabeth(this.abc, this.pokemonsArray);
    })
  }

  async rowClick(row: any){
    // console.log("click row: ", row);
    this.pokemonSelected = this.pokemonsArray.filter( pokemon => pokemon.name === row.name);
    // console.log("pokemonSelected: ", this.pokemonSelected);
    if(this.pokemonSelected){
      this.pokemonFind = await this.homeService.getPokemon(this.pokemonSelected[0].name);

      // console.log("pokemonFind: ", this.pokemonFind);
    }
  }

  async showInfoPokemon(pokemonName:string){
    this.pokemons.filter = pokemonName.toLowerCase();
  }

  applyFilter(event: any) {
    // console.log("event: ", event)
    if(event.key === 'Backspace'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.pokemons.filter = filterValue.trim().toLowerCase();
    }


    // console.log("event: ", event, filterValue, this.pokemons.filter = filterValue)
  }

  loadAlphabeth(abcArray:any[], pokemonArray:any[]){

    for(let i = 0; i < abcArray.length; i++) {
      for(let j = 0; j < pokemonArray.length; j++) {
        if(pokemonArray[j].name[0].includes(this.abc[i].letter)){
          abcArray[i].count++;
        }
      }
    }

    this.alphabet = new MatTableDataSource<any>(this.abc);
  }

}
