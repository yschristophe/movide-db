import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { lastValueFrom } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { Results } from '../interfaces/results.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  mostPopularMovies: Results | undefined;
  topMoviesMaxListSize: number = 5;
  topMovies: Movie[] = [];
  genresTagColor: string[] = ['blue', 'yell', 'orange'];
  trendingPeoples: Results | undefined;
  trendingPeoplesListSize: number = 10;

  constructor(public tmdb: TmdbService) {}

  async ngOnInit() {
    this.mostPopularMovies = await lastValueFrom(
      this.tmdb.getMostPopularMoviesList()
    );
    for (let index = 0; index < this.topMoviesMaxListSize; index++) {
      this.topMovies?.push(
        await lastValueFrom(
          this.tmdb.getMovieFromId(this.mostPopularMovies.results[index]?.id)
        )
      );
    }

    this.trendingPeoples = await lastValueFrom(
      this.tmdb.getTrendingPeopleFromRange("week")
    );
  }

  ngAfterViewInit() {
    this.loadScript('assets/js/custom.js');
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
