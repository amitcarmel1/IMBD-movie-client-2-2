import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MovieItemT } from "../models/MovieT";
import { MovieDetailsT } from "../models/MovieT";

@Injectable({providedIn:"root"})
export class MovieService{
    private movies : MovieItemT[] = [];
    private moviesSubject = new Subject<MovieItemT[]>();

    //private selectedMovie :MovieDetailsT|undefined;
    private selectedMovieSubject = new Subject<MovieDetailsT|undefined>();
    
    private moviesDetail : MovieDetailsT[] = [];
    private moviesSubjectDitail = new Subject<MovieDetailsT[]>();

    constructor(private http: HttpClient){

    }

    getMoviesListener(){
        return this.moviesSubject.asObservable();
    }
    getMoviesListenerD(){
        return this.moviesSubjectDitail.asObservable();
    }

    getSelectedMovieListener(){
        return this.selectedMovieSubject.asObservable();
    }

    getMovies( title:string =""){
        let url = "https://localhost:7004/api/Movie?imdbId=all";
        if(title.length>0){
            url += "&searchTitle="+title;
        }
        this.http.get<{Search:MovieItemT[]}>(url)
            .subscribe( response => {
                this.movies = response.Search;
                this.moviesSubject.next([...response.Search]);
                console.log(this.movies);
                
            } )
    }

    getMoviesDetail( title:string =""){
        let url = "https://localhost:7004/api/Movie?imdbId=all";
        if(title.length>0){
            url += "?searchTitle="+title;
        }
        this.http.get<{Search:MovieDetailsT[]}>(url)
            .subscribe( response => {
                this.moviesDetail = response.Search;
                this.moviesSubjectDitail.next([...this.moviesDetail]);
            } )
    }

    getMovieDetails(imdbId: string){
        const url = `https://localhost:7004/api/Movie?imdbId=${imdbId}`;
        this.http.get<MovieDetailsT>(url).subscribe( response => {
            console.log(response);
            this.selectedMovieSubject.next(response);
        })
    }

    onCloseModal(){
        this.selectedMovieSubject.next(undefined);
    }
}