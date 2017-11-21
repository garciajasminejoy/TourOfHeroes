import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class HeroService {

  private heroes: Hero[];

  constructor(private messageService: MessageService, private restangular: Restangular) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.restangular.all('heroes').getList();
  }

  getHero(id: string): Observable<Hero> {
    console.log('getHero id: ', id);
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.restangular.one('heroes', id).get();
    // return of(HEROES.find(hero => hero.id === id));
  }

  updateHero(hero: Hero): Observable<any> {
    return this.restangular.one('heroes', hero._id).customPUT(hero);
    // api/heroes/45454656
  }

  addHero(hero: Hero): Observable<Hero> {
    console.log(hero);
    return this.restangular.all('heroes').post({name: hero.name});
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero._id;
    // const url = `${'http://hero-backend.2muchcoffee.com/api/'}/${id}`;

    console.log('this is hero: ', hero);
    return this.restangular.one('heroes', id).remove();
  }
}
