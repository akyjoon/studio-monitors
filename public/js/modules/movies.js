class Movies {
  constructor() {
    this.key = '9254e3b4119189f89aecc4d2664c7133';
    this.search = document.getElementById('monitorName').textContent;
    this.url = `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&query=${this.search}`
    this.apiHolder = document.getElementById('api');
    this.fetcher();
  };


  fetcher() {
    fetch(this.url)
      .then(resp => {
        resp.json()
          .then(data => {
            let movies = data.results;
            movies.forEach(movie => {
              console.log(movie)
              this.apiHolder.innerHTML += `<li>${movie.title}</li>`;
            })
          })
      })
      //errors
      .catch(err => {
        console.log(err)
      })
  }
}


export default Movies;