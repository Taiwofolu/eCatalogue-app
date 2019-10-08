import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(public storage: Storage) { }
 
  isFavorite(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      return result && result.indexOf(filmId) !== -1;
    });
  }
 
  favoriteFilm(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        result.push(filmId);
        return this.storage.set('key', result);
      } else {
        return this.storage.set('key', [filmId]);
      }
    });
  }
 
  unfavoriteFilm(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        var index = result.indexOf(filmId);
        result.splice(index, 1);
        return this.storage.set('key', result);
      }
    });
  }
 
  getAllFavoriteFilms() {
    return this.storage.get('key');
  }
 
}