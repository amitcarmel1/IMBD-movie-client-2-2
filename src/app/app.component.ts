import { Component } from '@angular/core';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  constructor(private movieService: MovieService){

  }
  seasrchByTitle(title :string){
    this.movieService.getMovies(title);
  }
}
