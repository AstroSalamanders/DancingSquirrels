import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import PodcastListEntry from './PodcastListEntry.jsx';

import MUI from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


class PodcastList extends React.Component {

  constructor(props) {
    super(props);
    let hrefArr = window.location.href.split('/');
    this.username = hrefArr[hrefArr.length - 1];
    this.onClickPodcast = this.onClickPodcast.bind(this);
<<<<<<< 000e2d0a242b06064201dadd27ccd5f8ca339b16
    // console.log("LIST PROPS", props)
=======
    this.onFavorite = this.onFavorite.bind(this);
    // this.pods = props.pods
    console.log("LIST PROPS", props)
>>>>>>> Mobile / Login Btn / Favorites in Userpage
  }

  onFavorite(podcast) {
    console.log("Adding to Fav!", podcast);
    $.post('/favorite', {
      username: this.username,
      feedUrl: podcast.feedUrl,
      collectionId: podcast.collectionId,
      artworkUrl100: podcast.artworkUrl100,
      collectionName: podcast.collectionName,
      artistName: podcast.artistName
    })
      .done((result) => {
        console.log("DONE FAV, res",result)
        this.props.getFavPodcasts();
      });
  }

  onClickPodcast(podcast) {
    console.log("CLICKED ",podcast)
    var context = this;
    this.props.onClickPodcast(
      podcast.feedUrl, podcast.collectionId, 
      () => {
        this.context.router.history.push('/episodes');
    });
  }

  render() {

    const styles = { root: {
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-around'
                    },
                    gridList: {
                      display: 'flex',
                      flexWrap: 'nowrap',
                      overflowX: 'auto'
                    },
                    titleStyle: {
                      color: 'rgb(0, 188, 212)',
                    }
    };

    return (

      <div>

        <h3 className='podcast-results'>
        { this.props.currentPodcastView ? this.props.currentPodcastView.toUpperCase() : null  }
        </h3>

        <MUI>

        <div className="gridListContainer" >
        <GridList style={ styles.gridList } 
                  cols={4}
                  cellHeight='auto'
                  padding={10}
                  >

          { this.props.podcasts.map( (podcast, itr) => {

            return ( 
<<<<<<< 000e2d0a242b06064201dadd27ccd5f8ca339b16
              <div key={itr} className="tileContainer" onClick={ () => this.onClickPodcast(podcast) }>
=======
              <div className="tileContainer">
>>>>>>> Mobile / Login Btn / Favorites in Userpage

              { this.props.loggedIn ? 
                    <IconButton className="favBtn"
                                onClick={ () => this.onFavorite(podcast) }> 
                              <StarBorder color="#333" /> 
                      </IconButton> : null }

<<<<<<< 000e2d0a242b06064201dadd27ccd5f8ca339b16
=======

>>>>>>> Mobile / Login Btn / Favorites in Userpage
                <GridTile
                 onClick={ () => this.onClickPodcast(podcast) }
                  key={podcast.artworkUrl100}
                  cols={4}
                  rows={4}
                  actionIcon={
                    this.props.loggedIn ?  
                    (<IconButton className="favBtn">
                      <StarBorder color="#333" />
                    </IconButton>) : null
                  }
                  className="tile">
                  <img className="tileImg" src={podcast.artworkUrl100}/>
                </GridTile>
                <MUI>
                <div className="tileInfo">
                  <h4>{ podcast.collectionName }</h4>
                  <em>{ podcast.primaryGenreName }</em>
                </div>
                </MUI>
                  
              </div> )
          
           {/* 
            
            chunk from the gridtile
            actionIcon={<IconButton><StarBorder color="#333" /></IconButton>}
                titleStyle={{color: '#333'}}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)" 
            
            
            return (<div>

                      <PodcastListEntry
                        key={itr}
                        podcast={podcast}
                        onClickPodcast={this.props.onClickPodcast}
                        loggedIn={this.props.loggedIn} />

                        { this.props.loggedIn ? 
                          <button className='favorite-button' 
                                  onClick={ this.onFavorite.bind(this, podcast) }> 
                                  Favorite 
                          </button> : null }

                    </div> );  */}

            
          }) }

        </GridList>
        </div>
        </MUI>
      </div>
      
    );
  }
}

/*
  <h3 className='podcast-results'>{this.props.currentPodcastView}</h3>
  <div className='podcast-wrapper'>
    {
      this.props.podcasts.map((podcast, itr) => {
        return (
          <div key={itr}>
            <PodcastListEntry
              key={itr}
              podcast={podcast}
              onClickkPodcast={this.props.onClickPodcast}
              loggedIn={this.props.loggedIn}/>
            { this.props.loggedIn
              ? <button className='favorite-button' onClick={this.onFavorite.bind(this, podcast)}>Favorite</button>
              : null
            }
          </div>
        );
      })
    }
  </div>
*/

PodcastList.propTypes = {
  podcasts: PropTypes.array.isRequired,
  onClickPodcast: PropTypes.func.isRequired,
  getFavPodcasts: PropTypes.func,
  loggedIn: PropTypes.bool
};

PodcastList.contextTypes = {
  router: PropTypes.object
};

export default PodcastList;
