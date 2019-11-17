import React from 'react';
import Movie from './Movie';

const _renderMovies = (movielist, ctrlFnc)=>{
   const movies = movielist.map( (movie) =>{
    return <Movie key={movie.id} 
      id={movie.id}
      title={movie.title} 
      averageVote={movie.vote_average} 
      overview={movie.overview} 
      releaseDate={movie.release_date} 
      genres={movie.genre_ids} 
      imgPath="https://image.tmdb.org/t/p/w500/"
      poster={movie.poster_path} 
      from="upcoming"
      watched={movie.watched ? movie.watched : 0 }
      onCtrlWatch={ctrlFnc}
    />
  })
    return movies
  };

const UpcomingList = (props) => {
    return (
        <div className="wrapper">
        <div className={props.movies.length>0 ? "App" : "App_loading"}>
          {props.movies.length>0 ? _renderMovies(props.movies, props.onCtrlWatch) : 'Loading'}   
        </div>
      </div>
    );
};


export default UpcomingList;