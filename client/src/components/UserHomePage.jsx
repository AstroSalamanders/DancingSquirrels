import React from 'react';
import $ from 'jquery';
import Search from './Search.jsx';
import PodcastList from './PodcastList.jsx';
import PropTypes from 'prop-types';
import FavoritePodcasts from './FavoritePodcasts.jsx';


class UserHomePage extends React.Component {
  constructor(props) {
    super(props);
    // isntead of setting state, call function that sets on parent container
    // and call favorites

    let hrefArr = window.location.href.split('/');
    this.username = hrefArr[hrefArr.length - 1];
    // console.log("USER HOMEPAGE P",this.props);
  }

  componentDidMount(){
    this.props.updateLoggedIn();
    this.props.getFavorites();
  }

  render() {
    return (
      <div className='main-container'>
        <h2 className='podcast-results'>{this.username}'s Favorites</h2>
         <FavoritePodcasts
          favPodcasts={this.props.favPodcasts}
          getFavorites={this.props.getFavorites}
          onFavorite={this.props.onFavorite}
          onClickPodcast={this.props.onClickPodcast}
          loggedIn={this.props.loggedIn} /> 
        
        {this.props.categories.map((category, itr) => 
          <div key={itr}>
            <PodcastList
              podcasts={ this.props[category[0]] }
              category = {category[1]}
              getFavorites={this.props.getFavorites}
              onFavorite={this.props.onFavorite}
              onClickPodcast={this.props.onClickPodcast } 
              currentPodcastView={this.props.currentPodcastView}
              loggedIn={ this.props.loggedIn } />
          </div>              
        )}

      </div>
    )
  }
}

UserHomePage.propTypes = {
  onSearch: PropTypes.func.isRequired,
  podcasts: PropTypes.array.isRequired,
  onClickPodcast: PropTypes.func.isRequired
};

export default UserHomePage;
