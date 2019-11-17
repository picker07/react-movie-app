import React from 'react';
import './Movie.css';
import { MdGrade } from 'react-icons/md'


function Movie(props) {
  return (
      <div className="MovieCard">
        <div className="Movie_Column">
          <Poster poster={props.imgPath + props.poster} title={props.title} />
        </div>
        <div className="Movie_Column">
          <h1>{props.title}
              <button type="submit" className={props.from==="watch"?"btn_ctrlWatch": (props.watched===0?"btn_ctrlWatch":"btn_ctrlWatch_hidden")}  value={props.id} onClick={()=>props.onCtrlWatch(props)}> 
                {props.from==="watch"?'Remove -': (props.watched===0?'Watch +':'')} 
              </button>
          </h1>          
          <div className="Movie_Genres">
            {(props.genres).map( (genre, index) => <Genre genre={genre} key={index} /> )}
          </div>
          <span className="Movie_ReleaseDate">
            {props.releaseDate}
          </span>
          <span className="Movie_AverageVote">
            <MdGrade/>{props.averageVote}
          </span>
          <p className="Movie_Overview">
            {props.overview}
          </p>
        </div>
      </div>
    );
  }

  function Genre(props) {
    return (
      <span className="Genre">{props.genre}</span>
    );
  }
  
  function Poster(props) {
    return (
      <img className="posterImg" src={props.poster} alt={props.title} title={props.title} />
    );
  }

  
  export default Movie;
  