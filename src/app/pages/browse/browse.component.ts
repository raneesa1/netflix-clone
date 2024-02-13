import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieCategoryComponent } from '../../components/movie-category/movie-category.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie';
import { tmdbConfig } from '../../constants/config';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule,HeaderComponent,MovieCategoryComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent {
  movieService = inject(MovieService)
  router = inject(Router)
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcommingMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];
  bannerMovies !: Movie
  tmdbConfig=tmdbConfig
   public domSanitise=inject(DomSanitizer);
  
  ngOnInit(){
    this.movieService.getPopularMovies().subscribe((result:any)=>{
      this.popularMovies=result.results 
      this.bannerMovies=this.popularMovies[1]
      // console.log(this.popularMovies)
    this.movieService
        .getMovieVideos(this.bannerMovies.id)
        .subscribe((res: any) => {
          this.bannerMovies.videoKey = res.results.find(
            (x: any) => (x.site = 'YouTube')
          ).key;
          console.log(this.bannerMovies)
      
});

    })
      this.movieService.getTopRatedMovies().subscribe((result: any) => {
      this.topRatedMovies = result.results;
    });
    this.movieService.getNowPlayingMovies().subscribe((result: any) => {
      this.nowPlayingMovies = result.results;
    });
    this.movieService.getUpcomingMovies().subscribe((result: any) => {
      this.upcommingMovies = result.results;
    });
    
  }
  signOut() {
    localStorage.removeItem('token'); 
    this.router.navigateByUrl('/'); 
  }


}
