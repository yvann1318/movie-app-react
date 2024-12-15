import React from 'react';

const MovieList = (props) => {
    
    const FavouriteComponent = props.favouriteComponent;
    console.log("Props:", props);

    return (
        <>
            {props.movies.map((movie, index) => (
                
                <div key={movie.imdbID} className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster} alt='movie'></img>
                    <div onClick={() => props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;