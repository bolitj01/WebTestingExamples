import { movieService } from "./movieService.js";

//The controller talks to the service to interact with movie data
export const movieController = {
  getBestMovie() {
    const movies = movieService.getTopRated();
    return movies[0];
  },

  addMovie(movie) {
    return movieService.add(movie);
  },

  removeMovie(title) {
    return movieService.remove(title);
  },

  printRandomMovie() {
    const randomMovie = movieService.getAllMovies().sort(() => 0.5 - Math.random())[0];
    movieService.logMovie(randomMovie);
  },
};
