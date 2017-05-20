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

    this.state = { favoritePodcasts: [] };

    let hrefArr = window.location.href.split('/');
    this.username = hrefArr[hrefArr.length - 1];
    this.getFavorites = this.getFavorites.bind(this);
    this.updateLoggedIn = this.updateLoggedIn.bind(this);

    // console.log("USER HOMEPAGE P",this.props);
  }

  componentDidMount(){
    
    // var context = this;
    // setTimeout(function(){
    //   console.log("(UserHomePage) context.props.loggedIn: ", context.props.loggedIn)
    //   if ( !context.props.loggedIn ){
    //     console.log("will update login");
    //     context.updateLoggedIn();
    //   }
    // },100);

  }

  updateLoggedIn(){
    console.log("Updating LoggedIn")
    this.props.updateLoggedIn();
  }

  getFavorites() {
    $.get('/favorite', {
      username: this.username
    })
      .done((result) => {
        console.log("Favorites received:",result)
        this.setState({
          favoritePodcasts: result
        });
      });
  }

  render() {
    return (
      <div className='main-container'>
        <h2 className='podcast-results'>{this.username}'s Favorites</h2>
        
        {this.props.categories.map((category) => 
          <PodcastList
            podcasts={ this.props[category[0]] }
            category = {category[1]}
            onClickPodcast={this.props.onClickPodcast } 
            currentPodcastView={this.props.currentPodcastView}
            loggedIn={ this.props.loggedIn } />              
        )}


         <FavoritePodcasts
          favPodcasts={this.state.favoritePodcasts}
          getFavPodcasts={this.getFavorites}
          onClickPodcast={this.props.onClickPodcast}
          loggedIn={this.props.loggedIn} /> 

        {/*<h2 className='podcast-results'>Other Podcasts</h2>

        <PodcastList
          podcasts={this.props.podcasts}
          onClickPodcast={this.props.onClickPodcast }
          getFavPodcasts={this.getFavorites}
          loggedIn={this.props.loggedIn}/>*/}
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
