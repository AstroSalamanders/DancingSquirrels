import React from 'react';
import $ from 'jquery';
import PodcastListEntry from './PodcastListEntry.jsx';
import PropTypes from 'prop-types';


class FavoritePodcasts extends React.Component {
  constructor(props) {
    super(props);
  }

  onDelete(podcast) {
    $.ajax({
      url: '/favorite/' + podcast.collectionId,
      method: 'DELETE'
    })
      .done((result) => {
        // because its hard to find the where do we get the getFavorites when click
        if (this.props && this.props.getFavorites) {
          this.props.getFavorites();
        }
        else if(this.getFavorites) {
          this.getFavorites();
        }
      });
  }

  render() {
    return (
        <div className="podRow">
          <div className="gridListContainer" >
            <div className="gridListStructure">
              {
                this.props.favPodcasts.map((podcast, itr) => {
                  return (
                    <div key={itr}>
                      <PodcastListEntry
                        podcast={podcast}
                        getFavorites={this.props.getFavorites}
                        onFavorite={this.props.onFavorite}
                        onClickPodcast={this.props.onClickPodcast}
                        loggedIn={this.props.loggedIn}
                        onDelete={this.onDelete}/>
                      {/*<button className='delete-button' onClick={this.onDelete.bind(this, podcast, itr)}>Delete</button>*/}
                    </div>
                  )
                })
              }
              </div>
          </div>
        </div>
    );
  }
}

FavoritePodcasts.propTypes = {
  favPodcasts: PropTypes.array,
  getFavorites: PropTypes.func.isRequired,
  onClickPodcast: PropTypes.func.isRequired,
  loggedIn: PropTypes.string.isRequired
};

export default FavoritePodcasts;
