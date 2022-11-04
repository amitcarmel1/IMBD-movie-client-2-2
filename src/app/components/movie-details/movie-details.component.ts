import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MovieDetailsT } from 'src/app/models/MovieT';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  public movie: MovieDetailsT|undefined;
  constructor(private movieService: MovieService) { }


  ngOnInit(): void {
    this.movieService.getSelectedMovieListener().subscribe( (movie:MovieDetailsT|undefined) => {
        this.movie = movie;
    })

  }

  onCloseModal(){
    this.movieService.onCloseModal();
  }

}
