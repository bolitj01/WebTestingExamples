//Pretend data source like a database
export const movieService = {
  //Mock disney movie data with title and rating
  movies: [
    { title: "The Lion King", rating: 92 },
    { title: "Frozen", rating: 87 },
    { title: "Alladin", rating: 94 },
    { title: "Mulan", rating: 88 },
    { title: "Moana", rating: 93 },
  ],

  //Return top 3 rated movies
  getTopRated() {
    return this.movies.sort((a, b) => b.rating - a.rating).slice(0, 3);
  },

  getAllMovies() {
    return this.movies;
  },

  //Add and remove movies
  add(movie) {
    this.movies.push(movie);
    return true;
  },

  remove(movieTitle) {
    const index = this.movies.findIndex((m) => m.title === movieTitle);
    if (index !== -1) {
      this.movies.splice(index, 1);
      return true;
    }
    return false;
  },

  getMovieCount() {
    return this.movies.length;
  },

  //Log movie details
  logMovie(movieTitle) {
    const movie = this.movies.find((m) => m.title === movieTitle);
    if (movie) {
      console.log(`Movie: ${movie.title}, Rating: ${movie.rating}`);
    } else {
      console.log(`Movie: ${movieTitle} not found.`);
    }
  },
};
