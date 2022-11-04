import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { MovieItemT } from 'src/app/models/MovieT';
import { MovieDetailsT } from 'src/app/models/MovieT';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {

  public movies : MovieItemT[] = [];
 // public moviesDetails : MovieDetailsT[] = [];


  constructor(
    private svc: MovieService
  ) { }

  ngOnInit(): void {
    this.svc.getMoviesListener().subscribe( (movieList:MovieItemT[]) => {
      this.movies = movieList;
    })
    this.svc.getMovies();
    // this.svc.getMoviesListenerD().subscribe( (movieListD:MovieDetailsT[]) => {
    //   this.moviesDetails = movieListD;
    // })
    // this.svc.getMoviesDetail();
  }
 /////////////////////////////////////////////////////////
 
  onMovieClick(imdbId: string){
    this.svc.getMovieDetails(imdbId);
  }


  

}
