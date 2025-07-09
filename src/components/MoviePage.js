import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import MovieListHeading from './MovieListHeading';
import SearchBox from './SearchBox';
import AddFavourites from './AddFavourites';
import RemoveFavourites from './RemoveFavourites';
import LogoutButton from './LogoutButton'; // Import du composant LogoutButton


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=e4cfe1ab`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const addFavouriteMovie = async (movie) => {
    // Récupérer l'id utilisateur (à adapter selon ton système d'authentification)
    const utilisateur_id = localStorage.getItem('userId');
    if (!utilisateur_id) {
      alert('Vous devez être connecté pour ajouter un favori.');
      return;
    }

    // 1. Ajouter le film dans filmfavoris (si pas déjà présent)
    let film_id = null;
    try {
      const res = await fetch('http://localhost:5000/filmfavoris', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imdbID: movie.imdbID,
          poster: movie.Poster,
          title: movie.Title,
          type: movie.Type,
          yearMovie: movie.Year
        })
      });
      const data = await res.json();
      // Si déjà présent, il faut récupérer l'id du film
      if (data.id) {
        film_id = data.id;
      } else {
        // On va chercher l'id du film dans la bdd
        const res2 = await fetch('http://localhost:5000/filmfavoris');
        const films = await res2.json();
        const found = films.find(f => f.imdbID === movie.imdbID);
        if (found) film_id = found.id;
      }
    } catch (e) {
      console.error(e);
      alert('Erreur lors de l\'ajout du film.');
      return;
    }

    // 2. Associer le film à l'utilisateur dans favori
    if (film_id) {
      try {
        await fetch('http://localhost:5000/favori', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ utilisateur_id, film_id })
        });
        // Mettre à jour la liste locale des favoris (optionnel)
        setFavourites([...favourites, movie]);
      } catch (e) {
        console.error(e);
        alert('Erreur lors de l\'ajout du favori.');
      }
    }
  };

  const removeFavouriteMovie = async (movie) => {
    const utilisateur_id = localStorage.getItem('userId');
    if (!utilisateur_id) return;
    // Récupérer l'id du film dans la table filmfavoris
    let film_id = null;
    try {
      const res = await fetch('http://localhost:5000/filmfavoris');
      const films = await res.json();
      const found = films.find(f => f.imdbID === movie.imdbID);
      if (found) film_id = found.id;
    } catch (e) { return; }
    if (!film_id) return;
    // Supprimer le favori côté base
    await fetch(`http://localhost:5000/favori`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ utilisateur_id, film_id })
    });
    // Recharger la liste des favoris
    fetch(`http://localhost:5000/favoris/${utilisateur_id}`)
      .then(res => res.json())
      .then(data => {
        const favs = data.map(f => ({
          imdbID: f.imdbID,
          Poster: f.poster,
          Title: f.title,
          Type: f.type,
          Year: f.yearMovie
        }));
        setFavourites(favs);
      });
  };

  useEffect(() => {
    getMovieRequest(searchValue);
    // Charger les favoris de l'utilisateur connecté
    const utilisateur_id = localStorage.getItem('userId');
    if (utilisateur_id) {
      fetch(`http://localhost:5000/favoris/${utilisateur_id}`)
        .then(res => res.json())
        .then(data => {
          // Adapter les champs pour correspondre à l'affichage MovieList
          const favs = data.map(f => ({
            imdbID: f.imdbID,
            Poster: f.poster,
            Title: f.title,
            Type: f.type,
            Year: f.yearMovie
          }));
          setFavourites(favs);
        });
    }
  }, [searchValue]);

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-2 mb-4'>
        <div className='col-12 d-flex justify-content-end'>
          <LogoutButton />
        </div>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row custom-row' >
        <MovieList movies={movies} favouriteComponent={AddFavourites} handleFavouritesClick={addFavouriteMovie} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row custom-row'>
        <MovieList movies={favourites} favouriteComponent={RemoveFavourites} handleFavouritesClick={removeFavouriteMovie} />
      </div>
    </div>
  );
};

export default App;