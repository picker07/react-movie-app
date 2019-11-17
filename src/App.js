import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import UpcomingList from './UpcomingList';
import WatchList from './WatchList';
 
class App extends Component {  
  state = {
      upcomingMovies: [],
      watchMovies: []
  };

  componentDidMount(){
    this._getUpcomingList();
  }

  _getUpcomingList = async () =>{
    const upcomingMovies = await this._callApi(); 
    //console.log(upcomingMovies);
    this.setState({
      upcomingMovies
    })
  }

  _callApi = () =>{
    return fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=a777e433af1a5fddcc6597b0750246f9&language=en-US&page=1")
    .then(result => result.json())
    .then(json => json.results)
    .catch(err => console.log(err))
  }

  onInsertWatch = (data) => {  
    const { watchMovies, upcomingMovies } = this.state;
    
    const newWatchList = [
      ...watchMovies.concat({
        id: data.id,
        title: data.title,
        vote_average: data.averageVote,
        overview: data.overview,
        release_date: data.releaseDate,
        genre_ids: data.genres,
        imgPath: "https://image.tmdb.org/t/p/w500/",
        poster_path: data.poster,
        watched: 1
        })
    ];

    const upcomingIdx = upcomingMovies.findIndex(movie => movie.id === data.id );
    upcomingMovies[upcomingIdx].watched = 1;

    const sortData = [].concat(newWatchList)
    .sort((a, b) => {
      if(a.release_date > b.release_date){
        return -1;
      }
      else if(a.release_date > b.release_date){
        return 1;
      }
      return 0;
    });

    this.setState({
      watchMovies: sortData
    });
  };

  onRemoveWatch = (data) => {
    const { watchMovies, upcomingMovies } = this.state;
    const index = watchMovies.findIndex(movie => movie.id === data.id );

    const upcomingIdx = upcomingMovies.findIndex(movie => movie.id === data.id );
    upcomingMovies[upcomingIdx].watched = 0;

    const newWatchList = [
      ...watchMovies.slice(0, index),
      ...watchMovies.slice(index + 1, watchMovies.length)
    ];
    this.setState({
      watchMovies: newWatchList
    });
  };

  render(){
  return (
    <div className="App">
      <div className="menuWrap">
        <div className="menu">
          <ul>
            <li><Link to="/" className="menulink">Upcoming List</Link></li>
            <li><Link to="/WatchList" className="menulink">Watch List</Link></li>
          </ul>
        </div>
      </div>
      <Route path="/" exact={true} render={(props) => <UpcomingList {...props} movies={this.state.upcomingMovies} onCtrlWatch={this.onInsertWatch} />} />
      {/*<Route path="/WatchList" component={WatchList} /> */}
      <Route path="/WatchList" render={(props) => <WatchList {...props} movies={this.state.watchMovies} onCtrlWatch={this.onRemoveWatch} />} />
    </div>
  );
  }
}

export default App;
